import byteSize from "byte-size";

export default class Util {

    /**
     * Returns the current size of something
     * @param size The number size
     * @returns {Number}
     */
    static bytes(size: number): number {
        return byteSize(size);
    }

    /**
     * Round a number
     * @param value The number to be rounded
     * @param precision How many decimal numbers should be there
     * @returns {Number}
     */
    static round(value: number, precision: number): number {
        const multi = Math.pow(10, precision || 0);
        return Math.round(value * multi) / multi;
    }
}