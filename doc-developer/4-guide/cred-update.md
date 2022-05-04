---
sidebar_position: 1
---

# Credential Update

We currently support 2 ways to update your credential items: GraphQL and REST API.

## Prerequisite

1. First you need to create a credential that you want to use in your campaign. Please contact galaxy BD team if you have no experience with galaxy dashboard before, they will help you to understand concepts of galaxy dashboard and give you the access to it.
2. Then you will need an access token bound to your wallet address to use this API for updating your own credentials (credentials that created by you). We don’t have UI interface to generate access token for now, so if you want to use this API, please contact galaxy DEV team, so we can manually generate an access token for you to use.

## GraphQL

For more information on our GraphQL endpoint, please refer to [this doc](../5-graphql-api/overview.md).

### Input

1. (string, mandatory) auth->accessToken: use to auth if the you have access to update credential items, the user with this access token must be the credential curator
2. (int, mandatory) credId: the credential id you want to update
3. (enum string, mandatory) operation:
   1. APPEND, append items in the list.
   2. REPLACE, remove all items and replace with items in the list.
   3. REMOVE, remove items in the list.
4. (string array, mandatory) items: items list(address or email) to be modified, refer to operation.

### Example

```graphql
mutation {
  credentialItems(
    input: {
      auth: { accessToken: "11m9x2uMbEojrujzAp619KEl4RLVrO11" }
      credId: 312
      operation: APPEND
      items: [
        "0x04ebfd6240381af2c5f1a9e27f282bae8b92b257"
        "0x04edde76Cf5752f2bc1DC798BA1369dcA49d7c79"
        "0x04EeC1a5d0BC3C4291aeb962CBda49677E9a9FcB"
        "0x04f022af64bfc0f59ce1069e4ab51aa15148e60b"
        "0x04f26ef96b12fba7a507afba39bdfc78e0039742"
        "0x04f2c6b59e87b302b43400303427acd50f8071e6"
        "0x04f42ee649ee36edcf5ac9a97df343333a97fd24"
        "0x04f6b92fda46b8d9d33ca28d8837e1661edf8b97"
        "0x04f886e265cf2ec39f8868d7b6c67ab78e027736"
      ]
    }
  ) {
    message
  }
}
```

## REST

### Endpoint

- POST https://graphigo.prd.galaxy.eco/cred/{cred_id}/{operation} (production)

- POST https://graphigo.stg.galaxy.eco/cred/{cred_id}/{operation} (staging)

### Input

1. request header{”Access-Token”}: use to auth if the you have access to update credential items, the user with this access token must be the credential curator
2. url{cred_id}: the credential id you want to update
3. url{operation}:
4. append, append items in the list.
5. replace, remove all items and replace with items in the list.
6. reomve, remove items in the list.
7. body: items string array(address or email) to be modified, refer to operation.

### Example - Postman

![Example 1](./assets/example-1.png)
![Example 2](./assets/example-2.png)

### Example - Node.js

```typescript
// Nodejs using Axios lib
let axiosRes = await axios.post("https://graphigo.prd.galaxy.eco/query", {
  operationName: "modifyCredentialItems",
  query: `mutation modifyCredentialItems($accessToken: String!, $credId: Int!, $operation: Operation!, $items: [String!]!) { credentialItems(input: { auth:{ accessToken: $accessToken } credId: $credId operation: $operation items: $items }) { message } }`,
  variables: {
    accessToken: access_token,
    credId: cred_id,
    operation: operation,
    items: list_of_items,
  },
});

console.log(axiosRes.data);
```

### Example - Python

```python
# Python using python_graphql_client lib
client = GraphqlClient(endpoint="https://graphigo.stg.galaxy.eco/query")

query = """
    mutation ModifyCredentialItems($accessToken: String!, $credId: Int!, $operation: Operation!, $items: [String!]!) {
          credentialItems(input: {
                auth:{
                    accessToken: $accessToken
                }
                credId: $credId
                operation: $operation
                items: $items
          }) {
                message
        }
    }
"""
variables = {
    "accessToken": access_token,
    "credId": cred_id,
    "operation": operation,
    "items": list_of_items
}

resp = client.execute(query=query, variables=variables)

print(resp)
```
