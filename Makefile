all: build

clean:
	rm -rf build/

build:
	mkdir -p build
	zip -r build/chromelens.zip . -x *.git* CNAME Makefile images/ images/* */.DS_Store build/
	cp build/chromelens.zip build/chromelens.crx
