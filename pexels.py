import requests
from os import environ, path, mkdir
from random import randint

class Pexels:
	# photo_key_filter = {"id", "url", "width", "height", "photographer", "src"}
	photo_src_filter = {"original", "large", "landscape", "small"}
	cache_path = path.join(path.dirname(__file__) ,'cached')
	headers = {
	'Authorization': environ.get("PEXELS_API_KEY"),
	'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Mobile Safari/537.36 Edg/84.0.522.40'
	}
	per_page = 30
	if headers['Authorization'] is None:
		raise Exception("Pexels API key not found")

	def __init__(self, endpoint='curated', query=None):
		try:
			mkdir(Pexels.cache_path)
		except Exception as e:
			# print(e, Pexels.cache_path)
			pass
		self.__endpoint = endpoint
		self.query = query
		self.__page = 1
		self.__res = None
		if endpoint == 'search' and query is None:
				raise Exception("Query is required for search endpoint")

	def request_images(self, page=None, refresh=False):
		if page is None:
			page = self.__page
			if page == self.__page and self.__res is not None and not refresh:
				return self.__res

		if (refresh) or (not self.load_state(page)):
			# print('requesting')
			base_url = f"https://api.pexels.com/v1/{self.__endpoint}/"
			res =  requests.get(base_url, headers=Pexels.headers, params={'page': page, 'query': self.query, 'per_page': Pexels.per_page})
			# print(res.__dict__, res.encoding)
			self.__res = { **res.json(), 'photos': [ self.modify(image) for image in res.json()['photos']]}
			self.__page = page
			self.save_state()

		return self.__res

	def load_state(self, page):
		try:
			if self.__endpoint == "curated":
				with open(path.join(Pexels.cache_path, f'curated_{page}'), 'r', encoding='utf8', errors='ignore') as f:
					self.__dict__ = eval(f.read())
			if self.__endpoint == "search":
				with open(path.join(Pexels.cache_path, f'{self.query}_{page}'), 'r', encoding='utf8', errors='ignore') as f:
					self.__dict__ = eval(f.read())
			# print('loaded')
			return True
		except FileNotFoundError:
			return False

	def save_state(self):
		# print('save')
		if self.__endpoint == 'curated':
			with open(path.join(Pexels.cache_path, f'curated_{self.__page}'), 'w', encoding='utf8', errors='ignore') as f:
				f.write(repr(self.__dict__))
		else:
			with open(path.join(Pexels.cache_path, f'{self.query}_{self.__page}'), 'w', encoding='utf8', errors='ignore') as f:
				f.write(repr(self.__dict__))

	# def get_random_image(self):
	# 	self.request_images()
	# 	return self.__res['photos'][randint(0,Pexels.per_page-1)]

	@classmethod
	def modify(cls, photo):
		title = ' '.join(photo['url'].split('/')[-2].split('-')[:-1])
		# photo = { key: photo[key] for key in photo if key in cls.photo_key_filter}
		photo['src'] = { key: photo['src'][key] for key in photo['src'] if key in cls.photo_src_filter }
		photo['title'] = title
		# print(photo)
		return photo
