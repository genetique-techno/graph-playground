const h = require("highland")
const r = require("ramda")

const { v1 } = require("neo4j-driver")
const driver = v1.driver("bolt://localhost", v1.auth.basic("neo4j", "neo4j"))

const session = driver.session()

const specs = [
`
        create constraint on (p:Person) assert p.name is unique
`,
`
        merge (p:Person {name: "Aaron"})
        return p
`
]

h(specs)
	.flatMap(spec => h(push => {
		session.run(spec)
          .then(results => {
                  push(null, results)
                  push(null, h.nil)
          })
          .catch(err => push(err, h.nil))

	}))
	.tap(h.log)
  .errors(h.log)
	.done(() => {
		driver.close()
	})


