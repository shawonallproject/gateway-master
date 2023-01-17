const app = require("../server");
const mongoose = require("mongoose");
const supertest = require("supertest");
const Gateway = require("../src/api/models/Gateway");
const Device = require("../src/api/models/Device");

beforeEach((done) => {
  mongoose.connect(
    "mongodb://localhost:27017/GatewayMasterTestDB",
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => done()
  );
});

afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done());
  });
});

// /**
//  * Gateway Start
//  */
test("GET /api/gateway/all", async () => {
  const data = {
    SerialNumber: "1",
    Name: "test2",
    IPV4Address: "127.1.1.1",
  };
  const post = await Gateway.create(data);
  await supertest(app)
    .get("/api/gateway/all")
    .expect(200)
    .then((response) => {
      // Check type and length
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBeTruthy();
      expect(response.body.data.length).toEqual(1);

      // Check data
      expect(response.body.data[0]._id).toBe(post.id);
      expect(response.body.data[0].SerialNumber).toBe(post.SerialNumber);
      expect(response.body.data[0].Name).toBe(post.Name);
      expect(response.body.data[0].IPV4Address).toBe(post.IPV4Address);
    });
});

test("GET /api/gateway/:id", async () => {
  const data = {
    SerialNumber: "2",
    Name: "test2",
    IPV4Address: "127.1.1.1",
  };
  const post = await Gateway.create(data);
  await supertest(app)
    .get("/api/gateway/" + post.id)
    .expect(200)
    .then((response) => {
      // Check type and length
      expect(response.body.success).toBe(true);

      // Check data
      expect(response.body.data._id).toBe(post.id);
      expect(response.body.data.SerialNumber).toBe(post.SerialNumber);
      expect(response.body.data.Name).toBe(post.Name);
      expect(response.body.data.IPV4Address).toBe(post.IPV4Address);
    });
});

test("POST /api/gateway", async () => {
  const data = {
    SerialNumber: "3",
    Name: "test2",
    IPV4Address: "127.1.1.1",
  };

  await supertest(app)
    .post("/api/gateway")
    .send(data)
    .expect(201)
    .then(async (response) => {
      // Check the response
      expect(response.body.success).toBeTruthy();
      expect(response.body.data.SerialNumber).toBe(data.SerialNumber);
      expect(response.body.data.Name).toBe(data.Name);
      expect(response.body.data.IPV4Address).toBe(data.IPV4Address);
    });
});

test("DELETE /api/gateway/:id", async () => {
  const data = {
    SerialNumber: "4",
    Name: "test2",
    IPV4Address: "127.1.1.1",
  };
  const post = await Gateway.create(data);
  await supertest(app)
    .delete("/api/gateway/" + post.id)
    .expect(200)
    .then(async (response) => {
      // Check the response
      expect(response.body.success).toBeTruthy();
      expect(await Gateway.findOne({ _id: post.id })).toBeFalsy();
    });
});

test("PUT /api/gateway/:id", async () => {
  const data1 = {
    SerialNumber: "5",
    Name: "test2",
    IPV4Address: "127.1.1.1",
  };
  const post = await Gateway.create(data1);

  const data = {
    SerialNumber: "6",
    Name: "test22",
    IPV4Address: "127.1.1.2",
  };

  await supertest(app)
    .put("/api/gateway/" + post.id)
    .send(data)
    .expect(200)
    .then(async (response) => {
      expect(response.body.success).toBeTruthy();
      // Check the data in the database
      const newPost = await Gateway.findOne({ _id: post.id });
      expect(newPost).toBeTruthy();
      expect(newPost.SerialNumber).toBe(data.SerialNumber);
      expect(newPost.Name).toBe(data.Name);
      expect(newPost.IPV4Address).toBe(data.IPV4Address);
    });
});
// /**
//  * Gateway End
//  */

/**
 * Device Start
 */
test("GET /api/device/all", async () => {
  const gatewayData = {
    SerialNumber: "51",
    Name: "test 51",
    IPV4Address: "127.1.1.1",
  };
  const postGatewayData = await Gateway.create(gatewayData);
  const deviceData = {
    Gateway: postGatewayData.id,
    UID: 21,
    Vendor: "tres",
    OnlineStatus: true,
  };

  const post = await Device.create(deviceData);
  await supertest(app)
    .get("/api/device/all")
    .expect(200)
    .then((response) => {
      // Check type and length
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBeTruthy();
      expect(response.body.data.length).toEqual(1);

      // Check data
      expect(response.body.data[0]._id).toBe(post.id);
      expect(response.body.data[0].SerialNumber).toBe(post.SerialNumber);
      expect(response.body.data[0].Name).toBe(post.Name);
      expect(response.body.data[0].IPV4Address).toBe(post.IPV4Address);
    });
});

test("GET /api/device/:id", async () => {
  const gatewayData = {
    SerialNumber: "52",
    Name: "test 52",
    IPV4Address: "127.1.1.1",
  };
  const postGatewayData = await Gateway.create(gatewayData);
  const deviceData = {
    Gateway: postGatewayData.id,
    UID: 22,
    Vendor: "tres",
    OnlineStatus: true,
  };

  const post = await Device.create(deviceData);
  await supertest(app)
    .get("/api/device/" + post.id)
    .expect(200)
    .then((response) => {
      // Check type and length
      expect(response.body.success).toBe(true);

      // Check data
      expect(response.body.data._id).toBe(post.id);
      expect(response.body.data.SerialNumber).toBe(post.SerialNumber);
      expect(response.body.data.Name).toBe(post.Name);
      expect(response.body.data.IPV4Address).toBe(post.IPV4Address);
    });
});

test("POST /api/device", async () => {
  const gatewayData = {
    SerialNumber: "53",
    Name: "test 53",
    IPV4Address: "127.1.1.1",
  };
  const postGatewayData = await Gateway.create(gatewayData);
  const data = {
    Gateway: postGatewayData.id,
    UID: 23,
    Vendor: "tres",
    OnlineStatus: true,
  };

  await supertest(app)
    .post("/api/device")
    .send(data)
    .expect(201)
    .then(async (response) => {
      // Check the response
      expect(response.body.success).toBeTruthy();
      expect(response.body.data.Gateway).toBe(data.Gateway);
      expect(response.body.data.UID).toBe(data.UID);
      expect(response.body.data.Vendor).toBe(data.Vendor);
      expect(response.body.data.OnlineStatus).toBe(data.OnlineStatus);
    });
});

test("DELETE /api/device/:id", async () => {
  const gatewayData = {
    SerialNumber: "54",
    Name: "test 54",
    IPV4Address: "127.1.1.1",
  };
  const postGatewayData = await Gateway.create(gatewayData);
  const data = {
    Gateway: postGatewayData.id,
    UID: 24,
    Vendor: "tres",
    OnlineStatus: true,
  };
  const post = await Device.create(data);
  await supertest(app)
    .delete("/api/device/" + post.id)
    .expect(200)
    .then(async (response) => {
      // Check the response
      expect(response.body.success).toBeTruthy();
      expect(await Gateway.findOne({ _id: post.id })).toBeFalsy();
    });
});

test("PUT /api/device/:id", async () => {
  const gatewayData = {
    SerialNumber: "55",
    Name: "test 55",
    IPV4Address: "127.1.1.1",
  };
  const postGatewayData = await Gateway.create(gatewayData);
  const data1 = {
    Gateway: postGatewayData.id,
    UID: 25,
    Vendor: "tres",
    OnlineStatus: true,
  };
  const post = await Device.create(data1);
  const data = {
    Gateway: postGatewayData.id,
    UID: 26,
    Vendor: "tres",
    OnlineStatus: true,
  };

  await supertest(app)
    .put("/api/device/" + post.id)
    .send(data)
    .expect(200)
    .then(async (response) => {
      expect(response.body.success).toBeTruthy();
      // Check the data in the database
      const newPost = await Device.findOne({ _id: post.id });
      expect(newPost).toBeTruthy();
      expect(newPost.UID).toBe(data.UID);
      expect(newPost.Vendor).toBe(data.Vendor);
      expect(newPost.OnlineStatus).toBe(data.OnlineStatus);
    });
});
/**
 * Device End
 */
