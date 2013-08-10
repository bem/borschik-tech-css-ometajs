BIN = ./node_modules/.bin

all: css.ometajs.js

css.ometajs.js: css.ometajs
	$(BIN)/ometajs2js -b -i $< -o $@
