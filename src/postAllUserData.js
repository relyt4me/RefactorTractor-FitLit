function postAllUserData(userSleepData, activityUserData, hydrationUserData) {
  let sleepData = fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/sleep/sleepData', {
    method: 'POST',
    headers: {
  	'Content-Type': 'application/json'
    },
    body: JSON.stringify(userSleepData), // {"userID": integer, "date": string, "hoursSlept": integer, "sleepQuality": integer}
  })
    .then(response => response.json())
    .then(json =>console.log('Request success: ', json))
    .catch(err => console.log(err.message))

  let activityData = fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/activity/activityData', {
    method: 'POST',
    headers: {
  	'Content-Type': 'application/json'
    },
    body: JSON.stringify(activityUserData), // {"userID": integer, "date": string, "numSteps": integer, "minutesActive": integer, "flightsOfStairs": integer}
  })
    .then(response => response.json())
    .then(json =>console.log('Request success: ', json))
    .catch(err => console.log(err.message))

  let hydrationData = fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/hydration/hydrationData', {
    method: 'POST',
    headers: {
  	'Content-Type': 'application/json'
    },
    body: JSON.stringify(hydrationUserData), // {"userID": integer, "date": string, "hoursSlept": integer, "sleepQuality": integer}
  })
    .then(response => response.json())
    .then(json =>console.log('Request success: ', json))
    .catch(err => console.log(err.message))
}

export default postAllUserData