const button = document.querySelector(".nav-notification");
const modal = document.querySelector(".nav-notification-drop_down");
const profileButton = document.querySelector(".span-div");
const profileModal = document.querySelector(".span-div-modal");

// Utility functions

// button.addEventListener("focus", () => {
// 	console.log("button-focus");
// 	button.classList.add("button-focus");
// });

// profileButton.addEventListener("focus", () => {
// 	console.log("button-focus");
// 	profileButton.classList.add("button-focus");
// });

function addOrRemoveModalStyle(modal) {
	if (!modal.classList.contains("active")) {
		modal.style.display = "none";
	} else {
		modal.style.display = "";
	}
}

function onClickFunctionality(button, modal, otherButton, otherModal) {
	button.addEventListener("click", (e) => {
		e.stopPropagation();
		console.log("clicked");
		modal.classList.toggle("active");
		addOrRemoveModalStyle(modal);

		// Remove the active class from the other modal
		otherModal.classList.remove("active");
		addOrRemoveModalStyle(otherModal);
	});

	document.addEventListener("click", (e) => {
		if (
			!e.target.closest("." + button.classList[0]) &&
			!e.target.closest("." + modal.classList[0]) &&
			!e.target.closest("." + otherButton.classList[0]) &&
			!e.target.closest("." + otherModal.classList[0])
		) {
			modal.classList.remove("active");
			addOrRemoveModalStyle(modal);
			otherModal.classList.remove("active");
			addOrRemoveModalStyle(otherModal);
		}
	});
}
///TODO: button-when the button is clicked, it toggles the class of the modal, modal-the modal is toggled by the onCllck event of the button;
// profileButton-the profileButton is the other button in the navbar which when clicked, toggles the active class of the profileModal;  profileModal-the modal is toggled by the onCllck event of the profileModal
onClickFunctionality(button, modal, profileButton, profileModal);
onClickFunctionality(profileButton, profileModal, button, modal);

const menuOptions = [
	"Help Center",
	"Changelog",
	"Community forums",
	"Hire a Shopify partner",
	"Keyboard shortcuts",
];

const optionsDiv = document.querySelector(".menu-options");

menuOptions.forEach((optionText) => {
	const divElement = document.createElement("div");
	divElement.classList.add("hover");
	divElement.style.padding = "6px";
	divElement.textContent = optionText;
	optionsDiv.appendChild(divElement);
});

// the javascript code for the body

/// ==== ===== ==== === Variable and Objects declaration === === === ==
let _CARD_OBJ_LIST = [
	{
		title: "Customize your online store",
		body: "Choose a theme and add your logo, colors, and images to reflect your brand.",
		link: "",
		imgUrl: "https://crushingit.tech/hackathon-assets/customise-store.png",
		buttonText: "Customize theme",
	},
	{
		title: "Add your first product",
		body: "Write a description, add photos, and set pricing for the products you plan to sell. ",
		link: "",
		imgUrl: "https://crushingit.tech/hackathon-assets/product.png",
		buttonText: "Add product",
		buttonText2: "Import product",
	},
	{
		title: "Add a custom domain",
		body: "Your current domain is 222219.myshopify.com but you can add a custom domain to help customers find your online store.",
		link: "",
		imgUrl: "https://crushingit.tech/hackathon-assets/website.png",
		buttonText: "Add domain",
	},
	{
		title: "Name your store",
		body: "Your temporary store name is currently Davii collections. The store name appears in your admin and your online store.",
		link: "",
		imgUrl: "https://crushingit.tech/hackathon-assets/name-store.png",
		buttonText: "Name store",
	},
	{
		title: "Set up a payment provider",
		body: "Choose a payment provider to start accepting payments. You’ll need to create an account with the payment provider and set it up with your Shopify store. ",
		link: "",
		imgUrl: "https://crushingit.tech/hackathon-assets/payment.png",
		buttonText: "Set up payment",
	},
];

/// This function returns the counter component
/// and also update the value by calling
/// the render function
const Update = (count) => {
	render(`${count} / ${_CARD_OBJ_LIST.length} completed`, ".counter", true);
	if (count > 0) {
		render(Progress((72 / 5) * count), ".progress", true);
	}
};
/// This function works as a component for the
/// card used in this design
const Card = function ({ title, body, link, buttonText, imgUrl, buttonText2 }) {
	return `
    <div class="child-card">
        <div class="child-card-body">
            <div class="border"></div>
            <div class="content">
                <h3 class="title"> 
                    ${title}
                </h3>
                <div class="body">
                    <p>
                        ${body} 
                        <a href="http://" target="_blank" rel="noopener noreferrer">
                            Learn more    
                        </a>
                    </p>
                   <div class='btn-flex'>
                       <button class="app-text-button">
                            ${buttonText}
                        </button>
                        ${
													buttonText2 != undefined
														? `<button class="app-text-button transparent">
                                ${buttonText2}
                            </button>`
														: ""
												}
                   </div>
                </div>
            </div>
            <img 
                src="${imgUrl}" 
                alt="card-image"
                class="child-card-img">
        </div>
    </div>
    `;
};

/// This function works as the component progress bar
/// This is updated by the value passed in to the component
const Progress = (value) => {
	return `
        <div class="progress-bar" style='width:${value}px'></div>
    `;
};

///Card List Component
const CardList = () => {
	_CARD_OBJ_LIST.forEach((element) => {
		render(
			Card({
				title: element.title,
				body: element.body,
				buttonText: element.buttonText,
				buttonText2: element.buttonText2,
				imgUrl: element.imgUrl,
				link: element.link,
			}),
			".main-card-content"
		);
	});
};

///TODO: This function renders the html component
///to the specified target either id or class
const render = (content, target, clear) => {
	let dom = document.querySelector(target);
	if (clear) dom.innerHTML = "";
	dom.innerHTML += content;
};
/// load the card list
CardList();
Update(0);

///==================== Main Functiions for collapse ===========
const cardContainer = document.querySelectorAll(".child-card");
cardContainer.forEach((element) => {
	element.addEventListener("click", () => {
		cardContainer.forEach((co) => {
			co.classList.remove("opened");
		});
		element.classList.toggle("opened");
	});
});

///============= Checked functionality
/// This function gets the checkbox by class name (.border)
const checkBox = document.querySelectorAll(".border");
checkBox.forEach((element) => {
	element.addEventListener("click", () => {
		let count = 0;
		element.classList.toggle("checked");
		element.classList.toggle("border");
		checkBox.forEach((d) => {
			if (d.classList.contains("checked")) count++;
		});

		Update(count);
	});
});

/// Main card collaps function
const mainCard = document.querySelector(".main-card");
let arrow_btn = document.querySelector(".app-icon-button.arrow-btn");
arrow_btn.addEventListener("click", (e) => {
	mainCard.classList.toggle("close");
	arrow_btn.classList.toggle("arrow-btn-closed");
	arrow_btn.classList.toggle("arrow-btn-opened");
});

/// Main card collaps function
const heading = document.querySelector(".heading-card");
document.querySelector(".close-btn").addEventListener("click", () => {
	heading.classList.add("close");
});

/// This method update the checked boxes count
const countComp = document.querySelector(".counter");
document.querySelector(".close-btn").addEventListener("click", () => {
	heading.classList.add("close");
});
