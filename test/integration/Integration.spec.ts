import { expect } from "chai";
import TestUtil from "../TestUtil";
import Log from "../../src/util/Log";

describe('Integration Tests', function() {
    let outFiles: string[];

    before(function () {
        Log.test(`Before ${this!.test!.parent!.title}`);
        try {
            outFiles = TestUtil.attemptDirRead("./test/integration/out");
        } catch (err) {
            expect.fail('', '', `Failed to read one or more out files. ${err}`);
        }
    });


    it("output file was properly generated", function() {
        expect(outFiles).to.include("valid.ts");
    });

    it("output file was not generated due to parser errors", function() {
        expect(outFiles).to.not.include("invalid.ts");
    });

});