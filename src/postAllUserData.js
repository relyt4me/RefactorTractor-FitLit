function postAllUserData(userSleepData, userActivityData, userHydrationData) {
  let sleepData = fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/sleep/sleepData', {
    method: 'POST',
    headers: {
  	'Content-Type': 'application/json'
    },
    body: JSON.stringify(userSleepData),
  })
    .then(response => response.json())
    .then(json => console.log('Request success: ', json))
    .catch(err => console.log(err.message))

  let activityData = fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/activity/activityData', {
    method: 'POST',
    headers: {
  	'Content-Type': 'application/json'
    },
    body: JSON.stringify(userActivityData),
  })
    .then(response => response.json())
    .then(json => console.log('Request success: ', json))
    .catch(err => console.log(err.message))

  let hydrationData = fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/hydration/hydrationData', {
    method: 'POST',
    headers: {
  	'Content-Type': 'application/json'
    },
    body: JSON.stringify(userHydrationData),
  })
    .then(response => response.json())
    .then(json => console.log('Request success: ', json))
    .catch(err => console.log(err.message))
}

export default postAllUserData
