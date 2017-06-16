all: build

clean:
	rm -rf build/

deps:
	curl -o audit/axs_testing.js https://raw.githubusercontent.com/GoogleChrome/accessibility-developer-tools/master/dist/js/axs_testing.js

build:
	mkdir -p build
	zip -r build/chromelens.zip . -x *.git* CNAME Makefile images/ images/* */.DS_Store build/
