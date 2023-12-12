from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in expense_tracker/__init__.py
from expense_tracker import __version__ as version

setup(
	name="expense_tracker",
	version=version,
	description="This app is a integration   of Frappe and react Front is created on react and backend  will work on frappe will add all the exoensesand create a dashboard of all the expenses",
	author="Anuj yadav -dev",
	author_email="anuj@skyaitechnologies.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
