from flask import Flask, request, render_template, make_response, url_for
from pexels import Pexels
from random import randint

app = Flask(__name__)
params = {
	"per_page": 30,
	"page": 1,
}
curated_data = Pexels('curated')

app.config.from_object('config.DevelopmentConfig')

def get_random_image():
	return url_for('static', filename=f'img/cover-{randint(1,1)}.jpg')

@app.route('/')
def index():
	bg_image_url = get_random_image()
	# image_url = "https://images.pexels.com/photos/3597096/pexels-photo-3597096.jpeg?auto=compress&crop=focalpoint&cs=tinysrgb&fit=crop&fp-y=0.8&h=850.0&w=2600"
	# image_url = curated_data.get_random_image()['src']['landscape']
	return render_template('index.html', title='trending', bg_image_url=bg_image_url)


@app.route('/curated')
def curated():
	page = request.args.get('page', 1)
	response = curated_data.request_images(page)
	return make_response({'photos': response['photos']})

@app.route('/search/<string:query>')
def search(query):
	print(query)
	page = request.args.get('page', 1)
	response = Pexels('search', query).request_images(page)
	return make_response({'photos': response['photos']})
