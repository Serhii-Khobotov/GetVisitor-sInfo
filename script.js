const SEARCH_PARAMS_IN_URL = 'fields=status,message,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,proxy,hosting,query';

addEventListener('load', () => {
  fetchData();
});

// https://api.ipify.org?format=json

async function fetchData() {
  const userIP = await fetch('https://api.ipify.org?format=json')
    .then((response) => response.json())
    .then((result) => result)
    .catch((err) => console.error('Could not retrieve IP address', err));
  
  console.log(userIP.ip)
  

  const userInfo = await fetch(`http://ip-api.com/json/${userIP.ip}?${SEARCH_PARAMS_IN_URL}`)
    .then((response) => response.json())
    .then((result) => result)
    .catch((err) => console.error('Could not retrieve user info', err));
  
  const content = document.getElementById('content');
  
  if (userInfo.countryCode === 'UA') {
    const content1 = document.createElement('h1');
    const content2 = document.createElement('h1');
    content1.textContent = 'Welcome from';
    content2.textContent = 'Ukraine';
    content1.style.color = 'blue';
    content2.style.color = 'yellow';
    content.appendChild(content1);
    content.appendChild(content2);
  } else if (userInfo.proxy) {
    content.innerHTML = `<h1>You bastard! Don't use a VPN!</h1>`;
    content.style.color = 'red';
  } else {
    content.innerHTML = `<h1>Your IP is ${userInfo.query}</h1>
                         <h2>You are from ${userInfo.city}, ${userInfo.regionName}, ${userInfo.countryCode}</h2>
                         <h3>Your ISP is ${userInfo.isp}</h3>`;
  }

  console.log('userinfo', userInfo)
}



