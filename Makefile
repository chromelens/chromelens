all: build

clean:
	rm chromelens.zip

build:
	zip -r chromelens.zip . -x *.git* \*.crx \*.zip CNAME Makefile images/* */.DS_Store
