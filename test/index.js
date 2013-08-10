describe('css-ometajs: ', function() {

    var BORSCHIK = require('borschik');
    var FS = require('fs');
    var PATH = require('path');
    var ASSERT = require('assert');
    var FREEZE = BORSCHIK.freeze;

    function readFile(path) {
        return FS.readFileSync(PATH.resolve(__dirname, path));
    }

    function testFreeze(dir, inPath, outPath, okPath, freeze, minimize) {
        inPath = PATH.resolve(PATH.join(__dirname, dir, inPath));
        outPath = PATH.resolve(PATH.join(__dirname, dir, outPath));
        okPath = PATH.resolve(PATH.join(__dirname, dir, okPath));

        it('freeze css-ometajs ok', function() {
            return BORSCHIK
                .api({ tech: './index.js', input: inPath, output: outPath, freeze: freeze, minimize: minimize })
                .then(function() {
                    ASSERT.equal(readFile(outPath).toString(), readFile(okPath).toString());
                    done()
                }, function(e) {
                    done(e)
                })
                .fail(function(e) {
                    done(e);
                });
        });

        afterEach(function() {
            FS.unlinkSync(outPath);
            var rmPath = PATH.resolve(__dirname, dir, 'test/test2/wFPs-e1B3wMRud8TzGw7YHjS08I.png');
            if (FS.existsSync(rmPath)) FS.unlinkSync(rmPath);
            if (FS.existsSync(rmPath = FREEZE.realpathSync(PATH.join('test', dir, 'test/test2')))) {
                FS.rmdirSync(rmPath);
                FS.rmdirSync(FREEZE.realpathSync(PATH.join('test', dir, 'test')));
            }
        });
    }

    describe('freeze from .css (-t css-ometajs)', function() {
        testFreeze('freeze_from_css', 'test.css', '_test.css', 'ok_css.css', true, false);
    });


});
