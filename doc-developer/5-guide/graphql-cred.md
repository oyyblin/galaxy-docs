---
sidebar_position: 2
---

# How to set up a GraphQL/Subgraph credential through dashboard

## Introductions
- GraphQL/Subgraph type credential takes a single wallet address as input and outputs 0(false)/1(true) to indicate whether the wallet address is eligible.
- It requires 3 fields to fill in: 'Endpoint', 'Query' and 'Expression'. 
  - 'Endpoint' is the where query goes to. It can be Subgraph HTTP queries endpoint, or your own GraphQL API endpoint. 
  - 'Query' is the GraphQL query, it requires a single wallet address as input. In dashboard, once you finish your query, input a test address and click 'Run' button to check if the query is good.
  - 'Expression' is a snippet of JS code that processes the result of the query to make sure the output is 0 or 1. Once you have the 'Query' output, click 'Run' button to check if it processes correctly.
- During credential creating, once you choose 'Credential source' as 'Subgraph', you are about to create a GraphQL/Subgraph credential. Please note that Subgraph is a subset of GraphQL, the wording here is a little misleading, so if you have your own GraphQL interface, you can also use this.


## Subgraph Examples

### Endpoint
```
https://api.thegraph.com/subgraphs/name/hyd628/nomad-and-connext
```
### Query
```graphql
query info($address: String!) {
  receiveds(
    where: {
      recipient: $address
      block_gt: 1400000
      token_in: [
        "0x8f552a71EFE5eeFc207Bf75485b356A0b3f01eC9"
        "0x1DC78Acda13a8BC4408B207c9E48CDBc096D95e0"
        "0x30D2a9F5FDf90ACe8c17952cbb4eE48a55D916A7"
      ]
    }
  ) {
    id
  }
  fulfilleds(where: { user: $address, timestamp_gt: 1651986604 }) {
    id
    timestamp
  }
}

```
### Query output
```json
{
  "receiveds": [
    {
      "id": "0x000abcdefg..."
    }
  ],
  "fullfilleds": []
}
```
### Expression
```javascript
function(resp){
  if (resp != null && (resp.fulfilleds != null && resp.fulfilleds.length > 0 || resp.receiveds != null && resp.receiveds.length > 0)) {
     return 1
  }
  return 0
}
```
### Expression output
```
1
```

## GraphQL Example

### Endpoint
```
http://galaxy-graphigo.galaxy-app:8080/query
```
### Query
```graphql
query addressInfo($address: String!){
  addressInfo(address:$address)
  {
    hasEmail
  }
}
```
### Query output
```json
{
  "addressInfo": {
    "hasEmail": false
  }
}
```
### Expression
```javascript
function(data){
  if(data != null && data.addressInfo != null && data.addressInfo.hasEmail == true) {
    return 1
  }
  return 0
}
```
### Expression output
```
0
```
