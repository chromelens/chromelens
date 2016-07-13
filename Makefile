all: build

clean:
	rm -rf build/

build:
	mkdir -p build
	zip -r build/chromelens.crx . -x *.git* CNAME Makefile images/* */.DS_Store
