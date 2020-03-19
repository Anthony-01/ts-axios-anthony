import {
    isDate, isObject, isPlainObject, isFormData, isURLSearchParams, extend,
    deepMerge
} from "../../src/helpers/util";




describe("helpers: util", () => {
    describe("isXX:", () => { //测试组
        test("should validate Date", () => {
            expect(isDate(new Date())).toBeTruthy();
            expect(isDate(Date.now())).toBeFalsy();
        });

        test("should validate PlainObject", () => {
            expect(isPlainObject({})).toBeTruthy();
            expect(isPlainObject(new Date())).toBeFalsy();
        });

        test("should validate Object", () => {
            expect(isPlainObject({})).toBeTruthy();
            expect(isPlainObject(1)).toBeFalsy();
        });

        test("should validate FormData", () => {
            expect(isFormData(new FormData())).toBeTruthy();
            expect(isFormData({})).toBeFalsy();
        })

        test("should validate URLSearchParams", () => {
            expect(isURLSearchParams(new URLSearchParams())).toBeTruthy();
            expect(isURLSearchParams("foo=1&bar=2")).toBeFalsy();
        })
    })

    describe("extend", () => {
        test("should be mutable", () => {
            const a = Object.create(null);
            const b = {foo: 123};
            extend(a, b);

            expect(a.foo).toBe(123);
        })

        test("should extend properties", () => {
            const a = {foo: 123, bar: 234};
            const b = {bar: 577};
            const c = extend(a, b);

            expect(c.foo).toBe(123);
            expect(c.bar).toBe(577);
        })
    })

    describe("deepMerge:", () => {
        test("should be immutable", () => {
            const a = Object.create(null);
            const b: any = {foo: 123};
            const c: any = {bar: 577};
            deepMerge(a, b, c);

            expect(typeof a.foo).toBe("undefined");
            expect(typeof a.bar).toBe("undefined");
            expect(typeof b.bar).toBe("undefined");
            expect(typeof c.foo).toBe("undefined");
        })

        test("should deepMerge properties", () => {
            const a = Object.create(null);
            const b: any = {foo: 123};
            const c: any = {bar: 577};
            const d = deepMerge(a, b, c);

            expect(d.foo).toBe(123);
            expect(d.bar).toBe(577);
        })

        test("should deepMerge recursively", () => {
            const a = {foo: {bar: 123}}
            const b = {foo: {baz: 234}, zoo: {next: 222}};
            const c = deepMerge(a, b);

            expect(c).toEqual({
                foo: {
                    bar: 123,
                    baz: 234
                },
                zoo: {
                    next: 222
                }
            })
        })

        test("should remove all references from nested objects", () => {
            const a = {foo: {bar: 123}}
            const b: any = {};
            const c = deepMerge(a, b);

            expect(c).toEqual({
                foo: {
                    bar: 123
                }
            });

            expect(c.foo).not.toBe(a.foo);
        });

        test("should handle null and undefined arguments", () => {
            expect(deepMerge(undefined, undefined)).toEqual({});
            expect(deepMerge(undefined, {foo: 123})).toEqual({foo: 123});
            expect(deepMerge(null, null)).toEqual({});
        })
    })
})