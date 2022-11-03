<div align="center"><img width ='44px' align='center' src ='https://raw.githubusercontent.com/rahulbanerjee26/githubAboutMeGenerator/main/icons/reactjs.svg'>
<img width ='44px' align='center' src ='https://raw.githubusercontent.com/rahulbanerjee26/githubProfileReadmeGenerator/dede753e9b1dd7e1f5e8f9a9f094b67ecf7781ec/icons/redux.svg'>
</div>

# Understanding the Redux

## Understanding the Redux will help understand the Redux-React and Redux-Toolkit

### Actions

1- Define string constant for indicates of the action, not neccessary it avoid spelling mistakes

const CAKE_ORDERED = "CAKE_ORDERED";

2- Define an action. Remember action is an object has a type property whose value has a constant value "CAKE_ORDERED"

`{ type: CAKE_ORDERED }`

- Thats it, you have created your first action in Redux.
  If you need you can add more property in action. For instance;

`{ type: CAKE_ORDERED, quantity: 1 }`

- Now, we have our action in place
- In Redux, we have an extra to do which is implement "action creator". It creates actions, it is a function that returns an action

3- Implement action creator

```
function orderCake() {
return {
type: CAKE_ORDERED,
quantity: 1
}
}
```

- Sum up, action is an object which has a property, action creator is a function that returns an action

### Reducer

- Actions only describe what happen but don't describe application states changes. Reducers are in charge states changes
- (previousState, action) => newState

4- We need two arguments to write a reducer function, the "state" of application before making any change and the "action"

- In our application our state is number of cakes on the shelf

`numOfCakes = 10;`

- In Redux, states has to be a single object. So we need a object with property of number of cakes

```
const initialState = {
numOfCakes : 10
}
```

- So inital state is default value for the state parameter in the reducer

5- Define reducer function

`const reducer = () => {}`

- and this function need two arguments, first is previous state and second is action

`const reducer = (state= initialState, action) => {}`

- We are adding switch case where the expression is the action type

```
const reducer = (state= initialState, action) => {
switch(action.type) {
case CAKE_ORDERED:
return {
numOfCakes :state.numOfCakes -1
}
default :
return state
}
}
```

- Thats our reducer function. But in reality our state object might contain more than one property. For instance;

```
const initialState = {
numOfCakes : 10,
anotherProperty : 0
}
```

- To handle this scenario, it is always safe to first create a copy of state object and then change only the properties that need to.

- For copying state, we will add "...state" (spread operator) in return object

```
const reducer = (state= initialState, action) => {
switch(action.type) {
case CAKE_ORDERED:
return {
...state,
numOfCakes :state.numOfCakes -1
}
default :
return state
}
}
```

- In that reducer function, we first asking, copy previous state and then only change number of cakes properties. Other states (anotherProperty) will not change

### Redux Store

6- For creating Redux store, we need to import createStore method from

```
import {createStore} from "@reduxjs/toolkit"
```

- createStores method accepts parameters which is the reducer function

```
const store = createStore(reducer)
```

- Redux store first responsibility to holding state, with reducer function it do that. (reducer function has initials state)

- Second responsibility is to expose a method called getState which gives the current state in the store. With using console.log() we can see current state in the console.

```
console.log("Initial State", store.getState()) //-> "10"
```

- Fourth responsibilty is to allow to app subscribe to changes in the store, with using subscribe method

- subscribe method accepts functions as a parameter

```
store.subscribe(()=> console.log("update state", store.getState))
```

- Jump back to third responsibility. Store provides a dispatch method to update the state.

- dispatch method accepts action as a parameter. It invoke that action creator which will in turn return the aciton

```
store.dispatch(orderCake()) // --> After dispatch and invoke orderCake method, our state will be updated as 9
```

- Final part is to unsubscribe from the store by calling the function that function returned by the subscribe method

```
const unsubscribe = store.subscribe(()=> console.log("update state", store.getState))

```

- After all our code has completed we can call the unsubscribe method

unsubscribe()

## To sum these Redux pattern;

- First; create a store with createStore

```
const store = createStore(reducer)
```

- Second; Decleare initialState and reducer,define an action and action creator

```
const initialState = {
numOfCakes : 10
}

function orderCake() {
return {
type: CAKE_ORDERED,
quantity: 1
}

const reducer = (state= initialState, action) => {
switch(action.type) {
case CAKE_ORDERED:
return {
...state,
numOfCakes :state.numOfCakes -1
}
default :
return state
}
}

```

- Then; subscribe to the store

```
store.subscribe(()=> console.log("update state", store.getState))
```

- After; dispatch the action for trigger it

```
store.dispatch(orderCake())
```

- And finally, unsubcribe to the changes

```
unsubscribe()
```

### Bind Action Creator

- Helper function. This function turns an object, whose values are action creators, into an object with same keys but with every action creator wrapped into a dispatch call so they may be invoked "directly".

```
const action = bind ActionCreators({orderCake, restockCake}, store.dispatch)

action.orderCake()
```

- This will invoke the orderCake() function

### Multiple Reducers

- First implement different actions in one reducer;

```
const CAKE_ORDERED = "CAKE_ORDERED
const CAKE_RESTOCKED = "CAKE_RESTOCKED"
const ICECREAM_ORDERED = "ICECREAM_ORDERED"
const ICECREAM_RESTOCK = "ICECREAM_RESTOCK"

const initialState = {
  numOfCakes : 10,
  numOfIceCreams : 20
}

function orderCake() {
  return {
  type: CAKE_ORDERED,
  quantity: 1
}

function reStockCake(qty=1) {
  return {
  type: CAKE_RESTOCKED,
  quantity: qty
}

function orderIceCream(qty=1) {
  return {
  type: ICECREAM_ORDERED,
  quantity: qty,
}

function restockIceCream(qty=1) {
  return {
  type: ICECREAM_RESTOCK,
  quantity: qty
}


const reducer = (state= initialState, action) => {
  switch(action.type) {
    case CAKE_ORDERED:
    return {
      ...state,
      numOfCakes :state.numOfCakes -1
}
  case CAKE_RESTOCKED:
   return {
      ...state,
      numOfCakes :state.numOfCakes +1
}
  case ICECREAM_ORDERED:
    return {
      ...state,
    numOfIceCreams :state.numOfIceCreams -1
}
  case ICECREAM_RESTOCK:
    return {
      ...state,
      numOfIceCreams :state.numOfIceCreams +1
}
  default :
    return state
}
}

const action = bind ActionCreators({orderCake, restockCake, orderIceCream, restockIceCream}, store.dispatch)

  action.orderCake()
  action orderIceCream()

  unsubscribe()
```

- This using one reducer will definitly works, but when our parameters get more, it will be huge function and it will be diffucult to track and manage.

- In this point we can use "Multiple Reducers"
- Basically we will split our state and the reducer

- After splitting, we have two initial state and two reducer and need to create store with createStore. But the problem is createStore accepts only one reducer !

- Redux provides a method called combine reducers to combine multiple reducers into a single reducer whic can then be passed to the create store method.

```
//First import combineReducers
//Next, before create our store,  combine reducers which accepts objects

 const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
  })

 // And createStore will now accept root as an argument

  const store = createStore (rootReducer)

 // After this glabal states' path will be changed. If we want to reach numOfCakes;

 console.log(state.cake.numOfCakes)
```

- Some concepts in Redux;
  - Immer, helps nested states management.
  - Middleware: especially it is important for asynchronous aactions

### Asynchronous Actions

```
  state = {
    loading: true,
    data: [],
    error: ""
  }
```

- loading : Display a aloading spinner in your component
- data : List of users
- error : Display error to the user

- We have 3 actions ;

  - FETCH_USERS_REQUESTED - Fetch list of users
  - FETCH_USERS_SUCCEEDED - Fetched succeeded
  - FETCH_USERS_FAILED - Error when fetching the data

- Our Reducers will be ;
  - case:FETCH_USERS_REQUESTED
    loading: true
  - case: FETCH_USERS_SUCCEEDED
    loading: false
    users: data (from API)
  - case: FETCH_USERS_FAILED
    loading: false
    error: error (from API)

```
// First state

  const initialState = {
      loading: false,
     users: [],
      error:""
  }

// Then declaring the constants for the action types

  const FETCH_USERS_REQUESTED = "FETCH_USERS_REQUESTED"
  const FETCH_USERS_SUCCEEDED = "FETCH_USERS_SUCCEEDED"
  const FETCH_USERS_FAILED = "FETCH_USERS_FAILED"

// Actions

 const fetchUsersRequest = () => {
   return {
      type: FETCH_USERS_REQUESTED
    }
 }

  const fetchUsersSuccess = (users) => {
   return {
      type: FETCH_USERS_SUCCEEDED,
      payload: users
    }
 }

  const fetchUsersFailure = (error) => {
   return {
      type: FETCH_USERS_FAILED,
      payload: error
    }
 }

 //Now Reducer function

  const reducer = (state=initialState, action) => {
      switch (action.type) {
        case FETCH_USERS_REQUESTED:
          return {
            ...state,
            loading: true
          }
         case FETCH_USERS_SUCCEEDED:
          return {
            loading: false,
            users: action.payload,
            error: ""
          }
         case FETCH_USERS_FAILED:
          return {
            loading: false,
            users : [],
            error: action.payload
          }

  }
 }

 //The final step is to create our Redux store

  const store = createStore(reducer)

// These steps are setup for understanding the async actions

```

- What is left now is to calling API and dispatch the appropriate actions
- In that point we need to install two packages.
  - "axios for" request to an API end point
  - "redux-thunk" for the define async action creators. This is basically middleware we will be applying to our redux store

// First, in our store method, we will pass applyMiddleware as a argument, and we import thunkMiddleware from redux thunk it will be argument of this applyMiddleware

```
  const store = createStore(reducer, applyMiddleware(thunkMiddleware))

// Then define async action creator with the thunk, and dispatch actions

  const fetchUsers = () => {
      return function (dispatch) {
          axios.get("url").then((response) => {
            //response.data is the users
            const users = response.data.map((user)=> user.id)
          }).catch(error = {
            //error.message is the error message
          })
      }
  }
```

- We call our API, now we need to dispatch actions. In the above function;

```
  const fetchUsers = () => {
    dispatch(fetchUsersRequest())
    return function (dispatch) {
        axios.get("url").then((response) => {
          //response.data is the users
          const users = response.data.map((user)=> user.id)
          dispatch(fetchUsersSuccess(users))
      }).catch(error = {
          //error.message is the error message
          dispatch( fetchUsersFailure(error.message))
      })
    }
  }

const store = createStore(reducer, applyMiddleware(thunkMiddleware))

  store.subscribe(()=> {
    console.log(store.getState())
    }
  )

  store.dispatch(fetchUsers())

  //now you can see in the console users id
```

- Sum up;

  1- Import redux thunk middleware

  2- Pass it to the createStore function and this will create async actions for the reducers

  3- Dispatch the actions

> Notes from this tutorial; [Codevolution, Redux Toolkit Tutorial](https://www.youtube.com/playlist?list=PLC3y8-rFHvwiaOAuTtVXittwybYIorRB3)

![Visitors](https://komarev.com/ghpvc/?username=cgtysnsy&style=flat-square)
