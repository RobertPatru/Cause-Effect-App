// This contains all the people form people.json
let allPersons;

class People {
    static loadPeople() {
        const xhr = new XMLHttpRequest();

        xhr.open('GET', 'people.json', true);
        
        xhr.onload = function() {
            if (this.status === 200) {
                const people = JSON.parse(this.responseText);
                allPersons = people;

                let output = '';

                people.forEach(person => {
                    output += `<li id="${person.id}" class="left-list-item">${person.name}</li>`
                });

                document.querySelector('.left-side').innerHTML = output;
            }
        }
        
        xhr.send();
    }

    static showInfo(event) {
        if (event.target.classList.contains('left-list-item')) {    // if the element has the class "left-list-item"

            const allPeopleFromLeftList = document.querySelectorAll('.left-list-item'); // select all those elements
            allPeopleFromLeftList.forEach( person => person.classList.remove('selected')); // remove the class "selected" from all people
            event.target.classList.add('selected'); // add the class selected to the selected person

            const infoAboutPeople = document.querySelector('.right-side');

            allPersons.forEach( person => {
                if(person.id == event.target.id) {
                    infoAboutPeople.innerHTML = `
                        <div class="profile-picture"></div>
                        <div class="divide-content-bar"></div>
                        <ul class="right-side-list">
                            <div class="right-side-item-list" id="id">ID: <span>${person.id}</span></div>
                            <div class="right-side-item-list" id="name">Name: <span>${person.name}</span></div>
                            <div class="right-side-item-list" id="phone">Phone Number: <span>${person.phone}</span></div>
                            <div class="right-side-item-list" id="email">Email: <span>${person.email}</span></div>
                            <div class="right-side-item-list" id="city">City: <span>${person.city}</span></div>
                            <div class="right-side-item-list" id="country">Country: <span>${person.country}</span></div>
                            <div class="right-side-item-list" id="birthday">Birthday: <span>${person.birthday}</span></div>
                        </ul>
                    `;
                    document.querySelector('.profile-picture').style.background = `url('${person.profile_picture}') no-repeat top center/cover`;
                    
                }
            });
        }
    }

    static showProfilePictureInFullScnreen (event) {
        if (event.target.classList.contains('profile-picture')) {
            const bgImgURL = document.querySelector('.profile-picture').style.background.slice(0, -1);
            document.querySelector('.container').innerHTML = `
            <div class="center-profile-img">
                <div class="full-screen-profile-picture"></div>
            </div>
            `;
            document.querySelector('.full-screen-profile-picture').style.background = `${bgImgURL}t`;
            document.querySelector('.full-screen-profile-picture').style.backgroundSize  = `auto`;
            console.log(bgImgURL);
            
           
        }         
    }
    
}

People.loadPeople();

document.body.addEventListener('click', People.showInfo);
document.body.addEventListener('click', People.showProfilePictureInFullScnreen);