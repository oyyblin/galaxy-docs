---
sidebar_position: 1
---

# Credential Items Update

## Prerequisite
1. First you need to create a credential that you want to use in your campaign. Please contact galaxy BD team if you have no access/experience with galaxy dashboard before, they will help you to walk through concepts of galaxy dashboard and give you the access.
2. Then you will need an access token bound to your wallet address to use this API for updating your own credentials (credentials that created by you). We don’t have UI interface to generate access token for now, so if you want to use this API, please contact galaxy BD team, so we can manually generate an access token for you to use.

## Endpoint
For more information on our GraphQL endpoint, please refer to [this doc](../5-graphql-api/overview.md).

## Input
1. (header, string, mandatory) access-token: use to auth if the you have access to update credential items, the user with this access token must be the credential curator
2. (int, mandatory) credId: the credential id you want to update
3. (enum string, mandatory) operation:
   1. APPEND, append items in the list.
   2. REPLACE, remove all items and replace with items in the list.
   3. REMOVE, remove items in the list.
4. (string array, mandatory) items: items list(address or email) to be modified, refer to operation.

### GraphQl
```graphql
# header: "access-token": "fADp4yuJpwyx58OVZ05w2HQo3qABA000"

mutation {
  credentialItems(
    input: {
      credId: 312
      operation: APPEND
      items: [
        "0x111fd6240381af2c5f1a9e27f282bae8b92b257"
        "0x222dde76Cf5752f2bc1DC798BA1369dcA49d7c79"
        "0x333eC1a5d0BC3C4291aeb962CBda49677E9a9FcB"
        "0x444022af64bfc0f59ce1069e4ab51aa15148e60b"
        "0x55526ef96b12fba7a507afba39bdfc78e0039742"
        "0x6662c6b59e87b302b43400303427acd50f8071e6"
        "0x777742ee649ee36edcf5ac9a97df34333a97fd24"
        "0x8886b92fda46b8d9d33ca28d8837e1661edf8b97"
        "0x999886e265cf2ec39f8868d7b6c67ab78e027736"
      ]
    }
  ) {
    eligible(address:"0x999886e265cf2ec39f8868d7b6c67ab78e027736")
  }
}
```

## Examples
### Node.js
```typescript
// Nodejs using Axios lib
let axiosRes = await axios.post("https://graphigo.prd.galaxy.eco/query", {
  headers: {
    'access-token': 'fADp4yuJpwyx58OVZ05w2HQo3qABA000'
  },
  operationName: "modifyCredentialItems",
  query: `mutation credentialItems($credId: Int!, $operation: Operation!, $items: [String!]!) 
  { 
    credentialItems(input: { 
      credId: $credId 
      operation: $operation 
      items: $items 
    }) 
    { 
      message 
    } 
  }`,
  variables: {
    credId: cred_id,
    operation: operation,
    items: list_of_items,
  },
});

console.log(axiosRes.data);
```

### Python
```python
# Python using python_graphql_client lib
client = GraphqlClient(endpoint="https://graphigo.stg.galaxy.eco/query")

query = """
    mutation ModifyCredentialItems($credId: Int!, $operation: Operation!, $items: [String!]!) {
          credentialItems(input: {
                credId: $credId
                operation: $operation
                items: $items
          }) {
                name
        }
    }
"""

variables = {
    "credId": cred_id,
    "operation": operation,
    "items": list_of_items
}

header = { "access-token" : "fADp4yuJpwyx58OVZ05w2HQo3qABA000" }

resp = client.execute(query=query, variables=variables, header = header)

print(resp)
```