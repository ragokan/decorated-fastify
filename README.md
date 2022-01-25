# Decorated Fastify

### Basic

```ts
@Controller()
class HelloController {
  @Get()
  getHello = route((req, res) => {
    res.status(200).send({ message: "Hello World!" });
  });
}

registerControllers(fastify, [HelloController], {
  // optional
  basePath: "/api", // results all controllers to have a starting of /api
});

// get url/api -> message: Hello World!
```

### Bigger

```ts
 const mainSchema = Joi.object({
  text: Joi.string().required().messages({"any.required" : "Text is required"});
});


@Controller("/hello")
class HelloController {
  @Get("/main")
  getHello = route((req, res) => {
    res.status(200).send({ message: "Hello World!" });
  });

  @Validate(mainSchema)  // returns *Text is required*. You can make it look better with onError hook
  @Post("/main")
  createHello = route<{Body: { text: string }}>((req, res) => {
    res.status(200).send({ message: req.body.text }); // text is %100 exists, it is validated
  });
}

registerControllers(fastify, [HelloController], {
  basePath: "/api",
});

// get url/api/hello/main -> message: Hello World!
```

### Create and Use Middleware && Use services outside controllers/services

```ts
const Auth = CreateHandlerDecorator<string>(async (req, res, done, payload) => {
  if (req.headers.authorization) {
    req.user = await FastDI.service(dbService).getUser(req.headers.authorization); // Use service outside
    done();
  }
  // also you can use optional payload, its type is generic, so it is now string
  return reply.status(401).send({ message: "Needs auth" });
});

@Controller("/hello")
class HelloController {
  @Auth() // now user must be authorized - Also you can pass payload like @Auth("Admin")
  @Get("/main")
  getHello = route((req, res) => {
    res.status(200).send({ message: "Hello World!" });
  });
}
```

### Global Middleware

```ts
const Auth = CreateControllerHandlerDecorator<string>(async (req, res, done, payload) => {
  if (req.headers.authorization) {
    req.user = await FastDI.service(dbService).getUser(req.headers.authorization); // Use service outside
    done();
  }
  // also you can use optional payload, its type is generic, so it is now string
  return reply.status(401).send({ message: "Needs auth" });
});

@Auth() // it affects all non pure routes
@Controller("/hello")
class HelloController {
  @Get("/main") // this is protected
  getHello = route((req, res) => {
    res.status(200).send({ message: "Hello World!" });
  });

  @Pure()
  @Get("/main") // this is not protected
  getHi = route((req, res) => {
    res.status(200).send({ message: "Hi World!" });
  });
}
```
