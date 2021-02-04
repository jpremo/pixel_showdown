from flask import Blueprint, jsonify, request
from app.models import Image, db
import os
import base64
import imageio
import boto3
import tempfile
import uuid
from apng import APNG
import shutil

# let bucketRegion = "us-east-1";
# let IdentityPoolId = "us-east-1:013e5b90-632f-4e59-aa4f-ed9acdd8a8c3";

BUCKET_NAME=os.environ.get('BUCKET_NAME')
KEY_ID=os.environ.get('AWS_KEY_ID')
SECRET_KEY_ID=os.environ.get('AWS_SECRET_KEY')
s3 = boto3.client('s3',
                    aws_access_key_id=KEY_ID,
                    aws_secret_access_key=SECRET_KEY_ID
                     )

image_routes = Blueprint('images', __name__)


@image_routes.route('/', methods=['POST'])
def image_post():
    """
    Creates a new image from data on post request
    """
    data = request.get_json(force=True)

    fileData = data['file']
    fps = data['fps']
    uni = str(uuid.uuid4())
    unique_filename = uni + '.png'
    unique_filename_gif = uni + '.gif'
#     (fd, filename) = tempfile.mkstemp()
#     temp_dir = tempfile.TemporaryDirectory()
#     print(temp_dir.name)
# # use temp_dir, and when done:
#     temp_dir.cleanup()
#     # try:
        # tfile = os.fdopen(fd, "w")
        # tfile.write("Hello, world!\n")
        # tfile.close()
        # subprocess.Popen(["/bin/cat", filename]).wait()
        # script_dir = os.path.dirname(__file__)
    dirpath = tempfile.mkdtemp()
    path_to_data = dirpath
    # os.path.abspath(os.path.join(os.path.dirname( __file__ ), '..', 'data'))
# ... do stuff with dirpath

    # rel_path = "myfile3.png"
    filenames = []
    for i in range(0, len(fileData)):
        abs_file_path = os.path.join(path_to_data, 'img' + str(i) + '.png')
        filenames.append(abs_file_path)
        imgdata = base64.b64decode(fileData[i])
        with open(abs_file_path, 'wb') as f:
            f.write(imgdata)
    # abs_gif_path = os.path.join(script_dir, 'giftest2.gif')
    images = []
    for filename in filenames:
        images.append(imageio.imread(filename))

    filePlace = os.path.join(path_to_data, unique_filename)

    APNG.from_files(filenames, delay=100).save(filePlace)
    # imageio.mimsave(filePlace, images, 'GIF', duration = 1./fps)

    s3.upload_file(
                    Bucket = BUCKET_NAME,
                    Filename=filePlace,
                    Key = 'app-content/'+unique_filename
                )

    imageio.mimsave(filePlace, images, 'GIF', duration = 1./fps)

    s3.upload_file(
                    Bucket = BUCKET_NAME,
                    Filename=filePlace,
                    Key = 'app-content/'+unique_filename_gif
                )
    shutil.rmtree(dirpath)
    # finally:
    #     os.remove(filename)


    image = Image(
        title=data['title'],
        grid=data['grid'],
        gifImgUrl='https://pixel-showdown.s3.amazonaws.com/app-content/'+unique_filename_gif,
        apngImgUrl='https://pixel-showdown.s3.amazonaws.com/app-content/'+unique_filename,
        userId=data['userId'],
        competitionId=data['competitionId'],
    )


    db.session.add(image)
    db.session.commit()
    return image.to_dict()


@image_routes.route('/<int:id>', methods=['GET'])
def image_get(id):
    """
    Retrieves and returns information on the specified image id
    """
    image = Image.query.get(int(id))
    return image.to_dict()


@image_routes.route('/<int:id>', methods=['PUT'])
def image_put(id):
    """
    Updates an already existing image
    """
    data = request.get_json(force=True)
    image = Image.query.get(int(id))
    image.title = data['title']
    image.grid = data['grid']
    db.session.commit()
    return image.to_dict()
