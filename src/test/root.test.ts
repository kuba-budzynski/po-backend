import test from 'ava'
import request from 'supertest'
import {after, before, beforeEach} from "./helpers";

test.before(before)
test.beforeEach(beforeEach)
test.after.always(after)

test.serial('Test testów - czy root zwraca OK', async (t) => {
    const { app }: any = t.context;
    const res = await request(app).get('/')

    t.is(res.status, 200);
    t.is(res.text, "OK");
})
