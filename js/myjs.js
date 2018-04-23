var MAIN_AD_IMAGE_MAX = 800;
var CONTAINER_TRANSITION_SEC = 500;



var header;     // Header Div Element
var MenuButton;       // MenuButton Div Element
var NotificationButton , NotificationButtonNumber;   //Main top Right corner NotificationButton Div Element

var Container;       // Content Container
var ContainerMyAds; 
var ContainerSearchAds; 
var ContainerMyAggrements; 


var Menu;             // Creating the Menu Goes In Body
var MenuContents;
var SearchBox;
var SearchBoxLOCKER;

var FilterSearch;
var FilterPrice;
var FilterLocation;
var SearchBoxContainer;

var Modal;
var Modalcontent;

function OpentCloseMenu(){ MenuContents.scrollTop = 0; if(Menu.style.width == "250px"){	Menu.style.width = "0px"; Menu.style.boxShadow = "none"; }else{Menu.style.width = "250px"; Menu.style.boxShadow = "15px 15px 15px gray";}	}	
	
	
var PostAJobButton;           // Goes In MenuContents
var MyAdsButton;           //  Goes In MenuContents
var SearchJobsButton;           //  Goes In MenuContents
var ApplicationsButton;           //  Goes In MenuContents
var AggreementButton;
var JobRequestsButton;           // Goes In MenuContents
var MyProfileButton;           // Goes In MenuContents
var DashboardButton;           //  Goes In MenuContents
var MyActivityButton;           //  Goes In MenuContents
var FeedbacksButton;           //  Goes In MenuContents
var PaymentsButton;           // Goes In MenuContents
var HelpButton;           // Cr Goes In MenuContents
var SignoutButton;           // Goes In MenuContents


var JobSearchNotification;       //Element to control the notification count in Job Search
var ApplicationNotification;       //Element to control the notification count in Application
var JobRequestNotification;       //Element to control the notification count in JobRequest
var MessagesNotification;       //Element to control the notification count in Messages
      



var HistoryObj = [];           // History Objects

var MyAdOBJECTS = [];          // Ojbects to store MY Ads
function SaveMyAdOBJECTS(AdObject){
	
var Tempdata = { mainadinfo : AdObject, posterinfo : null , userphotolink : null , comment : 0 , applications : 0 , postedTime : AdObject.updatedTime , imgurls : AdObject.imagename};

firebase.firestore().collection("Users").doc(AdObject.posterID).get().then(function(USERdoc) {
	 Tempdata.posterinfo = USERdoc.data();
    	
	 firebase.storage().ref('UserProPics/' + USERdoc.id + '/Propic.png').getDownloadURL().then(function(url) {
	 Tempdata.userphotolink = url;    		

	             var OfferCountRef = firebase.firestore().collection("OfferZone").where("AdID", "==", AdObject.id);  											
	             OfferCountRef.get().then(function(THREEdoc) {			                 
				 Tempdata.applications   = THREEdoc.docs.length; // Getting Number of Applications
				
					   var CommentCountRef = firebase.firestore().collection("MainAds").doc(AdObject.id).collection("CommentZone");  											
	                   CommentCountRef.get().then(function(TWOquerySnapshot) {   
					   Tempdata.comment = TWOquerySnapshot.docs.length + Tempdata.comment; // Getting Number of Comments
					       
					      MyAdOBJECTS.push(Tempdata); 
						  AllAdsCreator(Tempdata,ContainerMyAds);							
						
					 
						 
					   
					   });
				 });	
				  
      });
	
	
	
});
	
	
}
var LastAdOBJECTS ;

var PageTitleDiv ;

var SearchAdOBJECTS = [];          // Ojbects to store MY Ads
function SaveSearchAdOBJECTS(AdObject){

var Tempdata = { mainadinfo : AdObject, posterinfo : null , userphotolink : null , comment : 0 , applications : 0 , postedTime : AdObject.updatedTime , imgurls : AdObject.imagename};
	
firebase.firestore().collection("Users").doc(AdObject.posterID).get().then(function(USERdoc) {
	 Tempdata.posterinfo = USERdoc.data();
    	
	 firebase.storage().ref('UserProPics/' + USERdoc.id + '/Propic.png').getDownloadURL().then(function(url) {
	 Tempdata.userphotolink = url;    		
            
	             var OfferCountRef = firebase.firestore().collection("OfferZone").where("AdID", "==", AdObject.id);  											
	             OfferCountRef.get().then(function(THREEdoc) {			                 
				 Tempdata.applications   = THREEdoc.docs.length; // Getting Number of Applications
				   
					   var CommentCountRef = firebase.firestore().collection("MainAds").doc(AdObject.id).collection("CommentZone");  											
	                   CommentCountRef.get().then(function(TWOquerySnapshot) {
					   Tempdata.comment = TWOquerySnapshot.docs.length + Tempdata.comment; // Getting Number of Comments					 
						  AllAdsCreator(Tempdata,ContainerSearchAds); 
						 SearchAdOBJECTS.push(Tempdata);						
						 
						 
					   
					   });
				 });	
				  
      });
	
	
	
});
	
	
}
var LastSearchAdOBJECTS ;



var LastAggrementAdPost;
var LastAggrementOfferPost;




function CreatingAllTheNavigation(){
		
	document.body.innerHTML = "";	
	document.body.style.background =  "#f2f2f2";//"linear-gradient(to right, white, #d9d9d9)";
	
	 // Header Starts here
	
	header = document.createElement("DIV");            // Creating the Header
	header.className = "header";
	document.body.appendChild(header);
	
var ContainerH = document.createElement("DIV");            // Creating the ContainerH Goes In Header
	ContainerH.className = "ContainerH";
	header.appendChild(ContainerH);
	
	MenuButton = document.createElement("DIV");            // Creating the ContainerH Goes In Header
	MenuButton.className = "MenuButton";
	MenuButton.onclick = function(){
		MainMenuSwitcher("MenuButton");
	}
	MenuButton.innerHTML = ' <i class="fa fa-navicon" ></i> ';
	MenuButton.onclick = function (){ OpentCloseMenu();};
	ContainerH.appendChild(MenuButton);
	
    NotificationButton = document.createElement("DIV");            // Creating the NotificationButton Goes In Header
	NotificationButton.className = "NotificationButton";
	NotificationButton.onclick = function(){
		MainMenuSwitcher("NotificationButton");
	}
	NotificationButton.innerHTML = ' <i class="fa fa-bell" ></i> ';
	NotificationButton.onclick = function (){ alert("Notified"); };
	ContainerH.appendChild(NotificationButton);	
	
	NotificationButtonNumber = document.createElement("DIV");            // Creating the ContainerH Goes In Header
	NotificationButtonNumber.className = "notiNumberClass";
	NotificationButtonNumber.innerHTML = "12";
	NotificationButton.appendChild(NotificationButtonNumber);
	
	
var LogoBar = document.createElement("DIV");            // Creating the LogoBar Goes In Header
	LogoBar.className = "LogoBar";
	LogoBar.innerHTML = "Logo Goes Here";	
	ContainerH.appendChild(LogoBar);
	
	 // Header Ends here
	 
	 // Menu Starts here For Left side Menu Navigation

	 
	Menu = document.createElement("DIV");            // Creating the MenuContents Goes In Body
	Menu.className = "Menu";
	Menu.innerHTML = "<div class = 'CloseMenuButton' onclick = 'OpentCloseMenu()'><i class='fa fa-arrow-circle-left' ></i></div> <div id = 'PageTitleBox' class = 'PageTitleBox'> </div>";
	document.body.appendChild(Menu); 
    
    PageTitleDiv = document.getElementById("PageTitleBox");	
	
    MenuContents = document.createElement("DIV");            // Creating the MenuContents Goes In Body
	MenuContents.className = "MenuContents";
	Menu.appendChild(MenuContents);
	
	PostAJobButton = document.createElement("DIV");            // Creating the PostAJobButton Goes In MenuContents
	PostAJobButton.className = "MenuNavigation";
	PostAJobButton.onclick = function(){
		MainMenuSwitcher("PostAJobButton");
	}
	PostAJobButton.innerHTML = "<div id = 'NaviIcon' class='fa fa-edit'></div> <p class = 'NaviText' >Post a Job</p>";
	MenuContents.appendChild(PostAJobButton);
	
	MyAdsButton = document.createElement("DIV");            // Creating the MyAdsButton Goes In MenuContents
	MyAdsButton.className = "MenuNavigation";
	MyAdsButton.onclick = function(){
		MainMenuSwitcher("MyAdsButton");
	}
	MyAdsButton.innerHTML = "<div id = 'NaviIcon' class='fa fa-newspaper-o'></div> <p class = 'NaviText' >My Ads</p>";
	MenuContents.appendChild(MyAdsButton);
	
	SearchJobsButton = document.createElement("DIV");            // Creating the SearchJobsButton Goes In MenuContents
	SearchJobsButton.className = "MenuNavigation";
	SearchJobsButton.onclick = function(){
		MainMenuSwitcher("SearchJobsButton");
	}
	SearchJobsButton.innerHTML = "<div id = 'NaviIcon' class='fa fa-search'></div> <p class = 'NaviText' >Search Jobs</p> <div id = 'JobSearchNotification' class='notiNumberClass'></div>"; GET_JobSearchNotification();
	MenuContents.appendChild(SearchJobsButton);
	
	
    AggreementButton = document.createElement("DIV");            // Creating the ApplicationsButton Goes In MenuContents
	AggreementButton.className = "MenuNavigation";
	AggreementButton.onclick = function(){
		MainMenuSwitcher("AggreementButton");
	}	
	AggreementButton.innerHTML = "<div id = 'NaviIcon' class='fa fa-handshake-o'></div> <p class = 'NaviText' >Agreements</p> <div id = 'MessagesNotification' class='notiNumberClass'>0 </div>";
	MenuContents.appendChild(AggreementButton);
	
	JobRequestsButton = document.createElement("DIV");            // Creating the JobRequestsButton Goes In MenuContents
	JobRequestsButton.className = "MenuNavigation";
	JobRequestsButton.onclick = function(){
		MainMenuSwitcher("JobRequestsButton");
	}
	JobRequestsButton.innerHTML = "<div id = 'NaviIcon' class='fa fa-question-circle'></div> <p class = 'NaviText' >Requests</p> <div id = 'JobRequestNotification' class='notiNumberClass'> 0 </div>";
	MenuContents.appendChild(JobRequestsButton);
	
	MyProfileButton = document.createElement("DIV");            // Creating the MyProfileButton Goes In MenuContents
	MyProfileButton.className = "MenuNavigation";
	MyProfileButton.onclick = function(){
		MainMenuSwitcher("MyProfileButton");
	}
	MyProfileButton.innerHTML = "<div id = 'NaviIcon' class='fa fa-user'></div> <p class = 'NaviText' >My Profile</p>";
	MenuContents.appendChild(MyProfileButton);
	
	DashboardButton = document.createElement("DIV");            // Creating the DashboardButton Goes In MenuContents
	DashboardButton.className = "MenuNavigation";
	DashboardButton.onclick = function(){
		MainMenuSwitcher("DashboardButton");
	}
	DashboardButton.innerHTML = "<div id = 'NaviIcon' class='fa fa-briefcase'></div> <p class = 'NaviText' >Dashboard</p>";
	MenuContents.appendChild(DashboardButton);
	
	MyActivityButton = document.createElement("DIV");            // Creating the MyActivityButton Goes In MenuContents
	MyActivityButton.className = "MenuNavigation";
	MyActivityButton.onclick = function(){
		MainMenuSwitcher("MyActivityButton");
	}
	MyActivityButton.innerHTML = "<div id = 'NaviIcon' class='fa fa-calendar-check-o'></div> <p class = 'NaviText' >My Activity</p>";
	MenuContents.appendChild(MyActivityButton);
	
	FeedbacksButton = document.createElement("DIV");            // Creating the FeedbacksButton Goes In MenuContents
	FeedbacksButton.className = "MenuNavigation";
	FeedbacksButton.onclick = function(){
		MainMenuSwitcher("FeedbacksButton");
	}
	FeedbacksButton.innerHTML = "<div id = 'NaviIcon' class='fa fa-star-half-empty'></div> <p class = 'NaviText' >Feedbacks</p>";
	MenuContents.appendChild(FeedbacksButton);
	
	PaymentsButton = document.createElement("DIV");            // Creating the PaymentsButton Goes In MenuContents
	PaymentsButton.className = "MenuNavigation";
	PaymentsButton.onclick = function(){
		MainMenuSwitcher("PaymentsButton");
	}
	PaymentsButton.innerHTML = "<div id = 'NaviIcon' class='fa fa-money'></div> <p class = 'NaviText' >Payments</p>";
	MenuContents.appendChild(PaymentsButton);
	
	HelpButton = document.createElement("DIV");            // Creating the HelpButton Goes In MenuContents
	HelpButton.className = "MenuNavigation";
	HelpButton.onclick = function(){
		MainMenuSwitcher("HelpButton");
	}
	HelpButton.innerHTML = "<div id = 'NaviIcon' class='fa fa-bullhorn'></div> <p class = 'NaviText' >Help</p>";
	MenuContents.appendChild(HelpButton);
	
	
	
	SignoutButton = document.createElement("DIV");            // Creating the SignoutButton Goes In MenuContents
	SignoutButton.className = "MenuNavigation";
	SignoutButton.innerHTML = "<div id = 'NaviIcon' class='fa fa-sign-out'></div> <p class = 'NaviText' >Sign out</p>";
	SignoutButton.onclick = function(){
		firebase.auth().signOut();
		location.reload();
	}
	MenuContents.appendChild(SignoutButton);
	
	ContainerCover = document.createElement("DIV");           
	ContainerCover.className = "ContainerCover";
    ContainerCover.onclick = function(){
		MenuContents.scrollTop = 0; if(Menu.style.width == "250px"){	Menu.style.width = "0px"; Menu.style.boxShadow = "none"; }
	}
	document.body.appendChild(ContainerCover);
	
	
	
	Container = document.createElement("DIV");           
	Container.className = "Container";
	ContainerCover.appendChild(Container);
	
	ContainerMyAds = document.createElement("DIV");           
	ContainerMyAds.className = "Container";
	ContainerMyAds.style.display = "none";
	ContainerCover.appendChild(ContainerMyAds);
	
	ContainerSearchAds = document.createElement("DIV");           
	ContainerSearchAds.className = "Container";
	ContainerSearchAds.style.display = "none";
	ContainerCover.appendChild(ContainerSearchAds);
	
	ContainerMyAggrements = document.createElement("DIV");           
	ContainerMyAggrements.className = "Container";
	ContainerMyAggrements.style.display = "none";
	ContainerCover.appendChild(ContainerMyAggrements);
	

	MainMenuSwitcher("PostAJobButton");

	 
    JobSearchNotification = document.getElementById("JobSearchNotification");        // Geting Element for the Search Job Noti
    ApplicationNotification = document.getElementById("ApplicationNotification");    // Geting Element for the Application Noti
    JobRequestNotification = document.getElementById("JobRequestNotification");     // Geting Element for the Job Req Noti
    MessagesNotification  = document.getElementById("MessagesNotification");       // Geting Element for the Msg Noti	  
	  	  
	SearchBox = document.createElement("DIV");           
	SearchBox.className = "SearchBox";
	document.body.appendChild(SearchBox);
	
	var SearchBoxCover = document.createElement("DIV");            // Creating the ContainerH Goes In Header
	SearchBoxCover.className = "ContainerH";
	SearchBox.appendChild(SearchBoxCover);
	
	FilterSearch = document.createElement("DIV");
	FilterSearch.className = "fa fa-car";
	FilterSearch.id = "FilterButtonID";
	SearchBoxCover.appendChild(FilterSearch);
	
	FilterPrice = document.createElement("DIV");
	FilterPrice.className = "fa fa-car";
	FilterPrice.id = "FilterButtonID";
	SearchBoxCover.appendChild(FilterPrice);
	
	FilterLocation = document.createElement("DIV");
	FilterLocation.className = "fa fa-car";
	FilterLocation.id = "FilterButtonID";
	SearchBoxCover.appendChild(FilterLocation);
	
	SearchBoxContainer = document.createElement("DIV");
	SearchBoxContainer.className = "SearchBoxContainer";
	SearchBoxCover.appendChild(SearchBoxContainer); 
	
	var delay = 200;
    var timeout = null;
    $(window).bind('scroll',function(){
	
    clearTimeout(timeout); 
	if(SearchBox == null){} else{HeaderSearchOFF();}
    timeout = setTimeout(function(){
       if(SearchBox == null){} else{HeaderSearchON();}
    },delay); 
    });	
	
	Modal = document.createElement("DIV");
	Modal.className = "modal";
	document.body.appendChild(Modal);
	
	var Modalclose = document.createElement("SPAN");
	Modalclose.className = "Modalclose";
	Modalclose.innerHTML = "&times;";
	Modalclose.onclick = function () { Modal.style.display = "none"; }
	Modal.appendChild(Modalclose);
	
	Modalcontent = document.createElement("IMG");
	Modalcontent.className = "modal-content";
	Modal.appendChild(Modalcontent);
  	   
}

function HeaderSearchOFF(){
	if(SearchBoxLOCKER == true){SearchBox.style.height = "0px"; header.style.height = "0px"; header.style.overflow = "hidden"; }
}
function HeaderSearchON(){
	if(SearchBoxLOCKER == true){SearchBox.style.height = "35px"; header.style.height = "47px"; header.style.overflow = "visible"; }
}

function GET_JobSearchNotification(){
	
	var NewDate = new Date (AddDaysWithCurrentDate(2));
	var MinimumDate = new Date (MinusDaysWithCurrentDate(100));
	var firestore = firebase.firestore().collection("MainAds")
	                                    .where("postedTime", ">", MinimumDate)
										.where("postedTime", "<", new Date());
       var OnlyMyAdsRef = firestore.orderBy("postedTime", "desc"); 
	   OnlyMyAdsRef.get().then(function(snapshot) {
		   
		
		   JobSearchNotification.innerHTML = snapshot.docs.length;
		   JobSearchNotification.style.background = "#cccccc";
		   JobSearchNotification.style.color = "gray";
		
      
       });

}


function GET_ApplicationsNotification(){
	
	var GET_Application = firebase.firestore().collection("OfferZone").where("AdposterID", "==", UserID); 
	
	   GET_Application.get().then(function(snapshot) {
		   
	
		   ApplicationNotification.innerHTML = snapshot.docs.length;
		   ApplicationNotification.style.background = "#cccccc";
		   ApplicationNotification.style.color = "gray";
		
      
       });

}

function MainMenuSwitcher(MenuString){
	
	
	Container.style.display = "none";
	ContainerMyAds.style.display = "none";
	ContainerSearchAds.style.display = "none";
	ContainerMyAggrements.style.display = "none";	
	
	Container.innerHTML = "";
	ContainerMyAds.innerHTML = "";
	ContainerSearchAds.innerHTML = "";
	ContainerMyAggrements.innerHTML = "";
	
	SearchBoxLOCKER = false;	
	if(SearchBox != null){SearchBox.style.height = "0px";}
	
	Menu.style.width = "0px";
	Menu.style.boxShadow = "none";
	MenuContents.scrollTop = 0;
	LoaderSpinnerAnimation();
	
	PageStateChangerWithPageTITLE(MenuString);
    Container.scrollTop = 0;
	
	switch(MenuString){		

		
	case "PostAJobButton"      :     PostAJobButtonGenerate();                                    break;
	case "MyAdsButton"         :     GenerateOnlyMyAds();       SearchBoxLOCKER = true;           break;
	case "SearchJobsButton"    :     GenerateSearchAllAds();    SearchBoxLOCKER = true;  JobSearchNotification.style.visibility = "hidden"; break;
	case "AggreementButton"    :     GenerateAllAggrements();        break;
	case "JobRequestsButton" :  break;
	case "MyProfileButton" :  break;
	case "DashboardButton" :  break;
	case "MyActivityButton" :  break;
	case "FeedbacksButton" :  break;
	case "PaymentsButton" :  break;
	case "HelpButton" :  break;

		
		
		
	}
		

    
	
}


function PageStateChangerWithPageTITLE(MenuString){
	
	 	
	switch(MenuString){
		
		
		
	case "PostAJobButton"     : PageTitleDiv.innerHTML = ""; PageTitleDiv.innerHTML = "<div id = 'PageTitleIcon' class='fa fa-edit'></div>";            SearchBoxLOCKER = false; break;
	case "MyAdsButton"        : PageTitleDiv.innerHTML = ""; PageTitleDiv.innerHTML = "<div id = 'PageTitleIcon' class='fa fa-newspaper-o'></div>";     SearchBoxLOCKER = true; break;
	case "SearchJobsButton"   : PageTitleDiv.innerHTML = ""; PageTitleDiv.innerHTML = "<div id = 'PageTitleIcon' class='fa fa-search'></div>";          SearchBoxLOCKER = true; break;
	case "MessagesButton"     : PageTitleDiv.innerHTML = ""; PageTitleDiv.innerHTML = "<div id = 'PageTitleIcon' class='fa fa-envelope'></div>";        SearchBoxLOCKER = false; break;
	case "JobRequestsButton"  : PageTitleDiv.innerHTML = ""; PageTitleDiv.innerHTML = "<div id = 'PageTitleIcon' class='fa fa-question-circle'></div>"; SearchBoxLOCKER = false; break;
	case "MyProfileButton"    : PageTitleDiv.innerHTML = ""; PageTitleDiv.innerHTML = "<div id = 'PageTitleIcon' class='fa fa-user'></div>";            SearchBoxLOCKER = false; break;
	case "DashboardButton"    : PageTitleDiv.innerHTML = ""; PageTitleDiv.innerHTML = "<div id = 'PageTitleIcon' class='fa fa-briefcase'></div>";       SearchBoxLOCKER = false; break;
	case "MyActivityButton"   : PageTitleDiv.innerHTML = ""; PageTitleDiv.innerHTML = "<div id = 'PageTitleIcon' class='fa fa-calendar-check-o'></div>";SearchBoxLOCKER = false; break;
	case "FeedbacksButton"    : PageTitleDiv.innerHTML = ""; PageTitleDiv.innerHTML = "<div id = 'PageTitleIcon' class='fa fa-star-half-empty'></div>"; SearchBoxLOCKER = false; break; 
	case "PaymentsButton"     : PageTitleDiv.innerHTML = ""; PageTitleDiv.innerHTML = "<div id = 'PageTitleIcon' class='fa fa-money'></div>";           SearchBoxLOCKER = false; break;  
    case "HelpButton"         : PageTitleDiv.innerHTML = ""; PageTitleDiv.innerHTML = "<div id = 'PageTitleIcon' class='fa fa-bullhorn'></div>";        SearchBoxLOCKER = false; break;  
		
}
	
	
}

function PostAJobButtonGenerate(){
	
	
	Container.innerHTML = "";	
	Container.style.display = "block";
	ContainerMyAds.style.display = "none";
	ContainerSearchAds.style.display = "none";
	ContainerMyAggrements.style.display = "none";
	
  setTimeout(function () { 
  
	LoaderSpinnerRemover();
 
	
	
	var SampleAd1 = "SampleAd1";
	var SampleAd2 = "SampleAd2";
	var SampleAd3 = "SampleAd3";
	var SampleAd4 = "SampleAd4";
	var SampleAd5 = "SampleAd5";
	var SampleAd6 = "SampleAd6";
	var SampleAd7 = "SampleAd7";
	var SampleAd8 = "SampleAd8";
	
	
	var SampleAdCover = document.createElement("DIV");
	SampleAdCover.className = "SampleAdCover"; 	
	Container.appendChild(SampleAdCover);	
	SampleAdCover.innerHTML = "<div class = 'SampleLeftSideDiv'> <div id = 'SampleLeftICON' class= 'fa fa-ambulance' ></div> </div> <div class = 'SampleRightSideDiv'> <div class = 'SampleRightText' >" + SampleAd1 + "</div> </div> </div> ";
	SampleAdCover.onclick = function(){
		JobPostingFormCreator(SampleAd1);
	}	
	var SampleAdCover = document.createElement("DIV");
	SampleAdCover.className = "SampleAdCover"; 	
	Container.appendChild(SampleAdCover);	
	SampleAdCover.innerHTML = "<div class = 'SampleLeftSideDiv'> <div id = 'SampleLeftICON' class= 'fa fa-ambulance' ></div> </div> <div class = 'SampleRightSideDiv'> <div class = 'SampleRightText' >" + SampleAd2 + "</div> </div> </div> ";
	SampleAdCover.onclick = function(){
		JobPostingFormCreator(SampleAd2);
	}	
	var SampleAdCover = document.createElement("DIV");
	SampleAdCover.className = "SampleAdCover"; 	
	Container.appendChild(SampleAdCover);	
	SampleAdCover.innerHTML = "<div class = 'SampleLeftSideDiv'> <div id = 'SampleLeftICON' class= 'fa fa-ambulance' ></div> </div> <div class = 'SampleRightSideDiv'> <div class = 'SampleRightText' >" + SampleAd3 + "</div> </div> </div> ";
	SampleAdCover.onclick = function(){
		JobPostingFormCreator(SampleAd3);
	}	
	var SampleAdCover = document.createElement("DIV");
	SampleAdCover.className = "SampleAdCover"; 	
	Container.appendChild(SampleAdCover);	
	SampleAdCover.innerHTML = "<div class = 'SampleLeftSideDiv'> <div id = 'SampleLeftICON' class= 'fa fa-ambulance' ></div> </div> <div class = 'SampleRightSideDiv'> <div class = 'SampleRightText' >" + SampleAd4 + "</div> </div> </div> ";
	SampleAdCover.onclick = function(){
		JobPostingFormCreator(SampleAd4);
	}	
	var SampleAdCover = document.createElement("DIV");
	SampleAdCover.className = "SampleAdCover"; 	
	Container.appendChild(SampleAdCover);	
	SampleAdCover.innerHTML = "<div class = 'SampleLeftSideDiv'> <div id = 'SampleLeftICON' class= 'fa fa-ambulance' ></div> </div> <div class = 'SampleRightSideDiv'> <div class = 'SampleRightText' >" + SampleAd5 + "</div> </div> </div> ";
	SampleAdCover.onclick = function(){
		JobPostingFormCreator(SampleAd5);
	}	
	var SampleAdCover = document.createElement("DIV");
	SampleAdCover.className = "SampleAdCover"; 	
	Container.appendChild(SampleAdCover);	
	SampleAdCover.innerHTML = "<div class = 'SampleLeftSideDiv'> <div id = 'SampleLeftICON' class= 'fa fa-ambulance' ></div> </div> <div class = 'SampleRightSideDiv'> <div class = 'SampleRightText' >" + SampleAd6 + "</div> </div> </div> ";
	SampleAdCover.onclick = function(){
		JobPostingFormCreator(SampleAd6);
	}	
	var SampleAdCover = document.createElement("DIV");
	SampleAdCover.className = "SampleAdCover"; 	
	Container.appendChild(SampleAdCover);	
	SampleAdCover.innerHTML = "<div class = 'SampleLeftSideDiv'> <div id = 'SampleLeftICON' class= 'fa fa-ambulance' ></div> </div> <div class = 'SampleRightSideDiv'> <div class = 'SampleRightText' >" + SampleAd7 + "</div> </div> </div> ";
	SampleAdCover.onclick = function(){
		JobPostingFormCreator(SampleAd7);
	}	
		var SampleAdCover = document.createElement("DIV");
	SampleAdCover.className = "SampleAdCover"; 	
	Container.appendChild(SampleAdCover);	
	SampleAdCover.innerHTML = "<div class = 'SampleLeftSideDiv'> <div id = 'SampleLeftICON' class= 'fa fa-ambulance' ></div> </div> <div class = 'SampleRightSideDiv'> <div class = 'SampleRightText' >" + SampleAd8 + "</div> </div> </div> ";
	SampleAdCover.onclick = function(){
		JobPostingFormCreator(SampleAd8);
	}   

	 }, CONTAINER_TRANSITION_SEC);	
}


function JobPostingFormCreator(titleEx){
	
	Container.innerHTML = "";
	Container.scrollTop = 0;
		
	setTimeout(function(){	
	
    var TenPixel = document.createElement("DIV");
	TenPixel.className = "TenPixel"; 	
	Container.appendChild(TenPixel); 
	
	var LocalID;
	var minDate = AddDaysWithCurrentDate(5);
	var maxDate = AddDaysWithCurrentDate(100);
	
	var AdTemplate = { id:"" ,title:"", description:"", address:"" , duedate:"" ,budget:"" , imgurls : "" };
    AdTemplate.imgurls = new Array();

	
	
	var FormGroupDiv = document.createElement("DIV");
	FormGroupDiv.className = "form-group";
	FormGroupDiv.innerHTML = "TITLE ";                // This FORMGRPUP DIV IS FOR THE TITLE	
	Container.appendChild(FormGroupDiv);
	
	var TitleTickIcone = document.createElement("I");
	FormGroupDiv.appendChild(TitleTickIcone);
	
	var InputElement = document.createElement("INPUT");
	
	InputElement.className = "form-control";
	InputElement.type = "text";
	InputElement.placeholder = titleEx;
	
	InputElement.oninput = function(){                 // Title Validation
		AdTemplate.title = this.value;
		TitleValidator(this.value , TitleTickIcone);
		PostItButtonGreen(TickIcons,POSTIT,AdTemplate);
		
	}
	
	FormGroupDiv.appendChild(InputElement);
	
	
	var FormGroupDiv = document.createElement("DIV");
	FormGroupDiv.className = "form-group";
	FormGroupDiv.innerHTML = "DESCRIPTION ";                // This FORMGRPUP DIV IS FOR THE DESCRIPTION
	
	Container.appendChild(FormGroupDiv);
	
	var DescriptionTickIcon = document.createElement("I");
	

	FormGroupDiv.appendChild(DescriptionTickIcon);
	
	var InputElement = document.createElement("TEXTAREA");
	InputElement.className = "form-control";
	InputElement.style.width = "100%";
	InputElement.style.height = "120px";
	InputElement.type = "text";
	InputElement.placeholder = "Write your DESCRIPTION here...";


	InputElement.oninput = function (){
		
		AdTemplate.description = this.value;
		DESCRIPValidator(this.value , DescriptionTickIcon);
		PostItButtonGreen(TickIcons,POSTIT,AdTemplate);
	}

	FormGroupDiv.appendChild(InputElement);
	
	
	
	var UPLOADBUTTON = document.createElement("BUTTON");             // This FORMGRPUP DIV IS FOR THE UPLOAD FILES
	UPLOADBUTTON.className = "btn btn-primary btn-lg btn-block";	
	UPLOADBUTTON.innerHTML = "Upload Photos";
	UPLOADBUTTON.onclick = function(){
		
		if(FileCover.style.height == "0px"){
			
			FileCover.style.height = "45px";
		}
		else{
			
			FileCover.style.height = "0px";
			
		}
		
	}
	
	Container.appendChild(UPLOADBUTTON);
		
	var FormGroupDiv = document.createElement("DIV");
	FormGroupDiv.className = "form-group";   
	
	Container.appendChild(FormGroupDiv);
	
	var FileCover = document.createElement("DIV");
	FileCover.className = "FileCover";
	FileCover.style.height = "0px";
	
	var FileElement= document.createElement("INPUT");
	FileElement.className = "form-control";
	FileElement.type = "file";
	FileElement.multiple = true;
	FileElement.onchange = function (e){
	AdTemplate.imgurls = new Array();
	
	var FileLimit = e.target.files.length;
	
	    if( FileLimit > 5){
	  
	     FileLimit = 5;
	  
	    }
		
	    var count = 0;
	    for(count; count < FileLimit ; count ++){
		   
		   if(e.target.files[count].type.split('/')[0]=='image'){ 
		        
				ImageConverter(e.target.files[count],MAIN_AD_IMAGE_MAX);
	       }
		   else{
			   
			   alert("Must be an image");
		   }
		  
		  
	     }
 
	   e = null;
	}
		
	FileCover.appendChild(FileElement);
	FormGroupDiv.appendChild(FileCover);
	
	// ImageConverterFuntion
	
	function ImageConverter(MainFile,MAX_SIZE){

	              var x = URL.createObjectURL(MainFile);
		          var img =  document.createElement("IMG");				
                  img.src = x ;    
				   img.onload = function (){
				   
				   var canvas = document.createElement("CANVAS");
				   var MAX_WIDTH = MAX_SIZE;
                   var MAX_HEIGHT = MAX_SIZE;
                   var width = img.width;
                   var height = img.height;

                   if (width > height) {
                   if (width > MAX_WIDTH) {
                      height *= MAX_WIDTH / width;
                      width = MAX_WIDTH;
                      }
                   } else {
                  if (height > MAX_HEIGHT) {
                     width *= MAX_HEIGHT / height;
                     height = MAX_HEIGHT;
                     }
                     }
                     canvas.width = width;
                     canvas.height = height;
                  var ctx = canvas.getContext("2d");
                     ctx.drawImage(img, 0, 0, width, height);
                     var DataURL = canvas.toDataURL();
					  fetch(DataURL)
                     .then(res => res.blob()) // Gets the response and returns it as a blob
                     .then(blob => {       
					 
					   AdTemplate.imgurls.push(blob);
					               
			 
	                 });   
					 
			       }
	
}
	
	var FormGroupDiv = document.createElement("DIV");
	FormGroupDiv.className = "form-group";
	FormGroupDiv.innerHTML = "LOCATION ";                // This FORMGRPUP DIV IS FOR THE LOCATION
	
	Container.appendChild(FormGroupDiv);
	
	var LocationTickIcon = document.createElement("I");


	FormGroupDiv.appendChild(LocationTickIcon);
    
	LocalID = GenerateNewIDfromDatabase();
	
	LocationTickIcon.id = LocalID +"ICON";
	var LocationInputElement = document.createElement("INPUT");
	LocationInputElement.id = LocalID;   // Creating Brand new ID for this whole form
	AdTemplate.id = LocalID;
	LocationInputElement.className = "form-control";
	LocationInputElement.type = "text";
	LocationInputElement.placeholder = "Enter a location";

 
	
	LocationInputElement.onfocus = function (){
		

		initAutocomplete(this.id);
	   	
		
	}

	FormGroupDiv.appendChild(LocationInputElement);
	
	
	var FormGroupDiv = document.createElement("DIV");
	FormGroupDiv.className = "form-group";
	FormGroupDiv.innerHTML = "DUE DATE ";                // This FORMGRPUP DIV IS FOR THE DUE DATE
	
	
	Container.appendChild(FormGroupDiv);
	
	var DueDateTickIcon = document.createElement("I");
	

	FormGroupDiv.appendChild(DueDateTickIcon);

	var InputElement = document.createElement("INPUT");
	InputElement.className = "form-control";
	InputElement.type = "date";
	InputElement.min = minDate;
	InputElement.max = maxDate;	

    minDate = new Date(minDate);
	maxDate = new Date(maxDate);
	
	
	InputElement.oninput = function (){
		
		var NewDate = new Date (this.value);
		
		if(NewDate > maxDate){
			
			this.value = this.max;
		}
		else if (NewDate < minDate){
			
			this.value = this.min;
			
		}
		
			
		AdTemplate.duedate = this.value;	
		DueDateValidator(this.value , DueDateTickIcon);
		PostItButtonGreen(TickIcons,POSTIT,AdTemplate);
		
		
	}

	FormGroupDiv.appendChild(InputElement);
	

	
	var FormGroupDiv = document.createElement("DIV");
	FormGroupDiv.className = "form-group";
	FormGroupDiv.innerHTML = "BUDGET ";                // This FORMGRPUP DIV IS FOR THE Budget
	
	Container.appendChild(FormGroupDiv);
	

	var BudgetTickIcon = document.createElement("I");	

	FormGroupDiv.appendChild(BudgetTickIcon);

	var BudgetInputElement = document.createElement("INPUT");
	BudgetInputElement.className = "form-control";
	BudgetInputElement.placeholder = "100 ‎৳";
	BudgetInputElement.type = "text";
	BudgetInputElement.oninput = function (){		
	           
	
		BudgetValidator(this.value , BudgetTickIcon , 100 );
		PostItButtonGreen(TickIcons,POSTIT,AdTemplate);
		AdTemplate.budget = this.value;
			
      
	}
	
	FormGroupDiv.appendChild(BudgetInputElement);
	

	
	var FormGroupDiv = document.createElement("DIV");
	FormGroupDiv.className = "form-group";             // This FORMGRPUP DIV IS FOR THE POST IT BUTTON
	
	Container.appendChild(FormGroupDiv);
	
		
	var POSTIT = document.createElement("BUTTON");             // This FORMGRPUP DIV IS FOR THE UPLOAD FILES
	POSTIT.className = "btn btn-info btn-lg btn-block";	
	POSTIT.innerHTML = "POST IT !";
	POSTIT.style.marginBottom = "50px";
	POSTIT.id = "PostITbuttonForForm";
	POSTIT.style.background ="#f2f2f2";	

	FormGroupDiv.appendChild(POSTIT);
	
	var TickIcons = [TitleTickIcone,DescriptionTickIcon,LocationTickIcon,DueDateTickIcon,BudgetTickIcon];
	AdTemplate.address = document.getElementById(LocalID);
	
	var LocationInvisDiv = document.createElement("DIV");    // Location Hidden Form
	LocationInvisDiv.className = "LocationInvisDiv"; 
    LocationInvisDiv.innerHTML = "<input class='field' id='street_number' disabled='true'></input> <input class='field' id='route' disabled='true'></input> <input class='field' id='locality' disabled='true'></input>  <input class='field' id='administrative_area_level_1' disabled='true'></input> <input class='field' id='postal_code' disabled='true'></input>  <input class='field'  id='country' disabled='true'></input>" ;	
	
    Container.appendChild(LocationInvisDiv);
	
	    }, CONTAINER_TRANSITION_SEC);
	
}
	

function UPDATEJobPostingFormCreator(AdObject){
	
	Container.innerHTML = "";
	Container.style.display = "block";
	ContainerMyAds.style.display = "none";
	ContainerSearchAds.style.display = "none";
	ContainerMyAggrements.style.display = "none";
	Container.scrollTop = 0;

	SearchBoxLOCKER = false;	
	if(SearchBox != null){SearchBox.style.height = "0px";}
	
	setTimeout(function(){
	
	
    var TenPixel = document.createElement("DIV");
	TenPixel.className = "TenPixel"; 
    var AllinOneDivContainer = Container;
	
	AllinOneDivContainer.appendChild(TenPixel); 
	
	var AdTemplate = { id:"" ,title:"", description:"", address:"" , duedate:"" ,budget:""};
	AdTemplate.id = AdObject.mainadinfo.id;
	AdTemplate.title = AdObject.mainadinfo.title;
	AdTemplate.description = AdObject.mainadinfo.description;
	AdTemplate.address = AdObject.mainadinfo.address;
	AdTemplate.duedate = AdObject.mainadinfo.duedate;
	AdTemplate.budget = AdObject.mainadinfo.budget;
	
	    
	

		
	var FormGroupDiv = document.createElement("DIV");
	FormGroupDiv.className = "form-group";
	FormGroupDiv.innerHTML = "TITLE ";                // This FORMGRPUP DIV IS FOR THE TITLE
	
	AllinOneDivContainer.appendChild(FormGroupDiv);
	
	var TitleTickIcone = document.createElement("I");
	

	FormGroupDiv.appendChild(TitleTickIcone);
	
	var InputElement = document.createElement("INPUT");
	
	InputElement.className = "form-control";
	InputElement.type = "text";
	InputElement.value = AdTemplate.title;	

	InputElement.oninput = function(){                 // Title Validation
		AdTemplate.title = this.value;
		TitleValidator(this.value , TitleTickIcone);
		PostItButtonGreen(TickIcons,POSTIT,AdTemplate);	 
		
	}

	FormGroupDiv.appendChild(InputElement);
	
	
	
	
	var FormGroupDiv = document.createElement("DIV");
	FormGroupDiv.className = "form-group";
	FormGroupDiv.innerHTML = "DESCRIPTION ";                // This FORMGRPUP DIV IS FOR THE DESCRIPTION
	
	AllinOneDivContainer.appendChild(FormGroupDiv);
	
	var DescriptionTickIcon = document.createElement("I");
	

	FormGroupDiv.appendChild(DescriptionTickIcon);
	
	var InputElement = document.createElement("TEXTAREA");
	InputElement.className = "form-control";
	InputElement.style.width = "100%";
	InputElement.style.height = "120px";
	InputElement.type = "text";
    InputElement.value = AdTemplate.description;	

	InputElement.oninput = function (){
		
		AdTemplate.description = this.value;
		DESCRIPValidator(this.value , DescriptionTickIcon);
		PostItButtonGreen(TickIcons,POSTIT,AdTemplate);
	}

	FormGroupDiv.appendChild(InputElement);
	
	
	
	var UPLOADBUTTON = document.createElement("BUTTON");             // This FORMGRPUP DIV IS FOR THE UPLOAD FILES
	UPLOADBUTTON.className = "btn btn-info btn-lg btn-block";	
	UPLOADBUTTON.innerHTML = "Upload Files";
	UPLOADBUTTON.disabled = true;
	UPLOADBUTTON.style.background = OnlneOfflineColor("Ash");
	
	AllinOneDivContainer.appendChild(UPLOADBUTTON);		
	
	var FormGroupDiv = document.createElement("DIV");
	FormGroupDiv.className = "form-group";
	FormGroupDiv.innerHTML = "LOCATION ";                // This FORMGRPUP DIV IS FOR THE LOCATION
	
	AllinOneDivContainer.appendChild(FormGroupDiv);
	

	
	var LocationInputElement = document.createElement("INPUT");
	LocationInputElement.className = "form-control";
	LocationInputElement.type = "text";
	LocationInputElement.value = AdTemplate.address;
	LocationInputElement.disabled = true;
	
	FormGroupDiv.appendChild(LocationInputElement);

	var FormGroupDiv = document.createElement("DIV");
	FormGroupDiv.className = "form-group";
	FormGroupDiv.innerHTML = "DUE DATE ";                // This FORMGRPUP DIV IS FOR THE DUE DATE
	
	
	AllinOneDivContainer.appendChild(FormGroupDiv);
	
	

	var InputElement = document.createElement("INPUT");
	InputElement.className = "form-control";
	InputElement.type = "text";
    var GetDate = new Date(AdTemplate.duedate);
	InputElement.value =   GetDate.getDay() + " " + MonthToString(GetDate.getMonth()) + " , " + GetDate.getFullYear() ;
  	InputElement.disabled = true;	

	FormGroupDiv.appendChild(InputElement);
	
	var FormGroupDiv = document.createElement("DIV");
	FormGroupDiv.className = "form-group";
	FormGroupDiv.innerHTML = "BUDGET ";                // This FORMGRPUP DIV IS FOR THE Budget
	
	AllinOneDivContainer.appendChild(FormGroupDiv);	

	var BudgetTickIcon = document.createElement("I");
	

	FormGroupDiv.appendChild(BudgetTickIcon);

	var BudgetInputElement = document.createElement("INPUT");
	BudgetInputElement.className = "form-control";
	BudgetInputElement.type = "text";
	BudgetInputElement.value = AdTemplate.budget;
	BudgetInputElement.oninput = function (){		
	           
	      if(this.value > 5000){
	  
	  this.value = 5000;
	  
        }			   
	
		BudgetValidator( this.value, BudgetTickIcon , AdTemplate.budget );
		PostItButtonGreen(TickIcons,POSTIT,AdTemplate);
		AdTemplate.budget = this.value;
			
      
	}
	
	FormGroupDiv.appendChild(BudgetInputElement);
	

	
	
	
	var FormGroupDiv = document.createElement("DIV");
	FormGroupDiv.className = "form-group";             // This FORMGRPUP DIV IS FOR THE POST IT BUTTON
	
	AllinOneDivContainer.appendChild(FormGroupDiv);
	
		
	var POSTIT = document.createElement("BUTTON");             // This FORMGRPUP DIV IS FOR THE UPLOAD FILES
	POSTIT.className = "btn btn-info btn-lg btn-block";	
	POSTIT.innerHTML = "POST IT !";
	POSTIT.id = "PostITbuttonForForm";
	POSTIT.style.background ="#33cc33";
	POSTIT.onclick = function () {
		
		
			if(BudgetTickIcon.className=="fa fa-check-square-o" &&
			   TitleTickIcone.className=="fa fa-check-square-o" &&
			   DescriptionTickIcon.className=="fa fa-check-square-o"){
				
				AdTemplate.budget = BudgetInputElement.value;
				UpdateSaveMainAds(AdTemplate , POSTIT);
				
			}
			
		
		
	}
	
	
	FormGroupDiv.appendChild(POSTIT);
	
	var TickIcons = [TitleTickIcone,DescriptionTickIcon,BudgetTickIcon];
	
    TitleTickIcone.className="fa fa-check-square-o";
	TitleTickIcone.style.color = "#33cc33";
	DescriptionTickIcon.className="fa fa-check-square-o";
	DescriptionTickIcon.style.color = "#33cc33";
	BudgetTickIcon.className="fa fa-check-square-o";
	BudgetTickIcon.style.color = "#33cc33";


		
	 }, CONTAINER_TRANSITION_SEC);
		
}


function UpdateSaveMainAds(AdTemplate , Postit){
	
	var TemplateID = AdTemplate.id;
	var Title = AdTemplate.title ;
	var Description = AdTemplate.description;
	var Budget =  Number(AdTemplate.budget) ;
	
	Postit.innerHTML = "";
	Postit.disabled = true;
	Postit.style.backgroundColor =  OnlneOfflineColor("online");
	Postit.className = "rotatorclass";
	
	
	          var firestore = firebase.firestore();			
		 	   
			   var UpdateMainAdsRef = firestore.collection("MainAds").doc(TemplateID);
			   
			  return UpdateMainAdsRef.update({
				  
		                  
		                    title: Title,
							description : Description,
							updatedTime : new Date(),
							budget : Budget
								
		
	                        }).then(function() {
                              
						
							 ConfirmAnimation();
							 MyAdOBJECTS = [];
							  setTimeout(function(){								   
	                              MainMenuSwitcher("MyAdsButton");
                              }, 1950);
							
                            });
			
			
			
		
}
	
	

function TitleValidator(titleValue , tickmark){
	
	if(titleValue.length > 9 && titleValue.length < 51){
		
		tickmark.className="fa fa-check-square-o";
		tickmark.style.color = "#00cc00";
		
		
	
	}
	else{
		
		tickmark.className="";
		
	}
	
}

function DESCRIPValidator(titleValue , tickmark){
	
	if (titleValue.length > 9 && titleValue.length < 1000){
		
			tickmark.className="fa fa-check-square-o";
			tickmark.style.color = "#33cc33";
	}	
	else{
		
	    tickmark.className="";
		
	}
	
	

	
}


function DateValidation(titleValue , tickmark){
	
if (titleValue == "" || titleValue == null) {
		
		tickmark.className="";	
	}
	
	else{
		tickmark.className="fa fa-check-square-o";
		tickmark.style.color = "#33cc33";
	}
	
	
	
}


function LocationValidator(GetInput, tickmark){
	
   var 	Country = document.getElementById("country").value;	
   var 	Division = document.getElementById("administrative_area_level_1").value;

  
	    
	    var CountryPos = GetInput.indexOf(Country);
		var LocalPos = GetInput.indexOf(Division);
		 
		
		 
		 if(CountryPos <= 0 || LocalPos <= 0){
			 
			tickmark.className="";
			
		   
			 
		 }
		 else {
			 
	    tickmark.className="fa fa-check-square-o";
		tickmark.style.color = "#33cc33";  
			 
		
			 
		 } 
		
}


function DueDateValidator(titleValue , tickmark){
	
if (titleValue == "" || titleValue == null) {
		
		tickmark.className="";	
	}
	
	else{
		
		
		
		tickmark.className="fa fa-check-square-o";
		tickmark.style.color = "#33cc33";
		
	}
	
	
	
}


function BudgetValidator(titleValue , tickmark , MinPrice){
	
if(titleValue >= MinPrice && titleValue <= 5000){
		
		tickmark.className="fa fa-check-square-o";
		tickmark.style.color = "#33cc33";
          
           
	}
		
	else{
		
	
		tickmark.className="";
	}
	
	


	
}

function PostItButtonGreen(TickIcons,Postit,AdData){
	
	LocationValidator(AdData.address.value, TickIcons[2]);
	
	
	
	setTimeout(function() {
   
    
	if(TickIcons[0].className=="fa fa-check-square-o" &&
	  TickIcons[1].className=="fa fa-check-square-o"    &&
	   TickIcons[3].className=="fa fa-check-square-o" &&
	    TickIcons[4].className=="fa fa-check-square-o" )
	{		
            Postit.style.background ="#33cc33";
		    Postit.onclick = function(){
				
				 SaveMainAds(AdData , "online" , Postit);
			// Data save function Goes here
			
				
			}
		
	}
	else{		
		Postit.style.background ="#f2f2f2";
		Postit.onclick = function(){
				
				alert("Validation Incomplete");
				
			}
    	}
	
	
	
	
	}, 1000);
	
	
	
	
}





var placeSearch, autocomplete;
var componentForm = {
  street_number: 'short_name',
  route: 'long_name',
  locality: 'long_name',
  administrative_area_level_1: 'short_name',
  country: 'long_name',
  postal_code: 'short_name'
};

function initAutocomplete(ID) {


  autocomplete = new google.maps.places.Autocomplete(
      /** @type {!HTMLInputElement} */(document.getElementById(ID)),
      {types: ['geocode']});

  // When the user selects an address from the dropdown, populate the address
  // fields in the form.
  autocomplete.addListener('place_changed', fillInAddress);
  
  
  
     // Set initial restrict to the greater list of countries.
        autocomplete.setComponentRestrictions(
            {'country': ['bd']});
  

       
 
  
  
  
  
}

function fillInAddress() {
  // Get the place details from the autocomplete object.
  var place = autocomplete.getPlace();

  for (var component in componentForm) {
    document.getElementById(component).value = '';
    document.getElementById(component).disabled = false;
	
	
  }

  // Get each component of the address from the place details
  // and fill the corresponding field on the form.
  for (var i = 0; i < place.address_components.length; i++) {
    var addressType = place.address_components[i].types[0];
    if (componentForm[addressType]) {
      var val = place.address_components[i][componentForm[addressType]];
      document.getElementById(addressType).value = val;
    }
  }
     
  
	LocationValidator(document.getElementById(RecentLocationID).value, document.getElementById(RecentLocationID + "ICON"));
	
	
	
  
}

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
	
	
	
      var geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
		
		
		
      };
      var circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      });
      autocomplete.setBounds(circle.getBounds());
    });
  }
}






function RegisterUser(UserID,displayName,Phone,Email,PhotoURL){
	
	
	
	firebase.firestore().collection("Users").doc(UserID).get().then(function(doc) {
                    if (doc.exists) {
                           
						   window.location.replace("MainPage.html");
						   
                     } else {
	                
	                       firebase.firestore().collection("Users").doc(UserID).set({
		                   
						    uid : UserID , 
		                    name: displayName,
							regitime : new Date()
		
		
	                        }).then(function(){
                            								
							SaveProfileImageForUser(PhotoURL);   // Saving ProImage to Database
							firebase.firestore().collection("Users").doc(UserID).collection("Private").doc(UserID).set({
		                   
						    phone : Phone , 
		                    email: Email
		
		
	                        }).then(function(){	
							
							LoaderSpinnerRemover();
							ConfirmAnimation();
							    
								setTimeout(function(){
	                             
								 
					             window.location.replace("MainPage.html");
					 
                               }, 2500);
							
								
					      });
							
							
					      });
          
                     }
	
	          });
	
	
	
}



function ConfirmAnimation(){
	
 var Loader = document.createElement("DIV");
             document.body.appendChild(Loader);
 
 
 var Confirm = document.createElement("IMG");
     Confirm.className = "GreenTickMarkDiv";
     Confirm.src = "img/confirmtick.gif";
	 Confirm.src = Confirm.src.replace(/\?.*$/,"")+"?x="+Math.random();
	 Loader.appendChild(Confirm);	 
	 
	 setTimeout(function(){
	 
       document.body.removeChild(Loader); 
		
    }, 4000);
	
	
	
}



function LoaderSpinnerAnimation(){

 var Loader = document.createElement("DIV");
     Loader.className = "loader";
     Loader.id = "Loader";
     document.body.appendChild(Loader); 
 
}


function LoaderSpinnerRemover(){
	
	var Loader = document.getElementById("Loader");
	document.body.removeChild(Loader); 
   
	
}



function SaveProfileImageForUser(PhotoURL){


  
   fetch(PhotoURL)
  .then(res => res.blob()) // Gets the response and returns it as a blob
  .then(blob => {
               
			 
		 
			
		  var SaveProfilestoRef = firebase.storage().ref("UserProPics/" + UserID + "/Propic.png");		
				 
	             SaveProfilestoRef.put(blob).then(function(snapshot) {});
	
           });     


}


function SaveMainAdImages(BlobFile,ADid,ImageName){

 var SaveMainAdstoRef = firebase.storage().ref("MainAdPhotos/" + ADid + "/" + ImageName);		
  SaveMainAdstoRef.put(BlobFile).then(function(snapshot) {
                                    
   });
	



}
	 
	
	
function SaveMainAds(AdTemplate , AdsState , Postit){
	
	
	var TemplateID = AdTemplate.id;
	var Title = AdTemplate.title ;
	var ImageNames = [];
	var Description = AdTemplate.description;
	var localAdress =  AdTemplate.address.value;
	var DueDate = new Date(AdTemplate.duedate);
	var Budget =  Number(AdTemplate.budget) ;
	var NewDate =  new Date();	
	    DueDate.setHours(NewDate.getHours());
		DueDate.setMinutes(NewDate.getMinutes());
		DueDate.setSeconds(NewDate.getSeconds());
	
		
	Postit.innerHTML = "";
	Postit.disabled = true;
	Postit.style.backgroundColor =  OnlneOfflineColor(AdsState);
	Postit.className = "rotatorclass";

	          var firestore = firebase.firestore();
			
		 	   
			   var AdTemplateRef = firestore.doc("MainAds/" + TemplateID );
			   
			   if(AdTemplate.imgurls.length > 0){						
					for(var count = 0 ; count < AdTemplate.imgurls.length ; count++){
					   var TempName = GenerateNewIDfromDatabase() + ".png"
					   ImageNames.push(TempName);
					 }
				 } 
			   
	   
			   
			   AdTemplateRef.set({
		                      
							id: TemplateID,  
		                    title: Title,
							imagename : ImageNames,
							posterID : UserID,
							postedTime : NewDate,
							updatedTime : NewDate,
							description : Description,
							address : localAdress,
							duedate : DueDate,
							budget : Budget,
							state : AdsState
		
		
	                        }).then(function(){	
							 
						     if(AdTemplate.imgurls.length > 0){						
					                 for(var count = 0 ; count < AdTemplate.imgurls.length ; count++){
						             SaveMainAdImages(AdTemplate.imgurls[count],TemplateID, ImageNames[count]);
								     }
							  } 
							 ConfirmAnimation();
							 MyAdOBJECTS = [];
							  setTimeout(function(){								   
	                              MainMenuSwitcher("MyAdsButton");
                              }, 1950);
							
						}); 
		
		
}



	
function GenerateOnlyMyAds(){	
	
	ContainerMyAds.innerHTML = "";
	Container.style.display = "none";
	ContainerMyAds.style.display = "block";
	ContainerSearchAds.style.display = "none";
	ContainerMyAds.scrollTop = 0; 
	SearchBox.style.height = "35px";

  setTimeout(function () {     
	if(MyAdOBJECTS.length > 0){LoaderSpinnerRemover();}	
  }, CONTAINER_TRANSITION_SEC);	
	
	
	var firestore = firebase.firestore().collection("MainAds").where("updatedTime", "<=",new Date()).where("posterID", "==", UserID); 
	var DataLengthLimit = 10;
	

	
	if(MyAdOBJECTS.length > 0){
	   
		for(var count = 0; count < MyAdOBJECTS.length ; count ++){			
                    AllAdsCreator(MyAdOBJECTS[count],ContainerMyAds); 
			}
	   
	}
	else{
		                   
    
    var OnlyMyAdsRef = firestore.orderBy("updatedTime", "desc").limit(DataLengthLimit); 
	OnlyMyAdsRef.get().then(function(ONEquerySnapshot) {
	 
		 LastAdOBJECTS = ONEquerySnapshot.docs[ONEquerySnapshot.docs.length-1];
		 setTimeout(function () {  LoaderSpinnerRemover(); }, 5000);
    ONEquerySnapshot.forEach(function(ONEdoc) {
		 
	        SaveMyAdOBJECTS(ONEdoc.data());
    
		
		});
		
	
   
	});	///////////////////////End of OnlyMyAdsRef/////////////////
	   OnScrollFunction();
	   function OnScrollFunction(){
		var NoMoreLength = false;
	    var DOES_EXIST = false;
		
	    ContainerMyAds.onscroll = function (){
	
		
		if(this.scrollTop + window.innerHeight >= this.scrollHeight && DOES_EXIST == false && NoMoreLength == false){	
		    DOES_EXIST = true; 	LoaderSpinnerAnimation();		
		    setTimeout(function () { DOES_EXIST = false; LoaderSpinnerRemover(); }, 1500);
       
		      var OnlyMyAdsRef = firestore.orderBy("updatedTime", "desc").startAfter(LastAdOBJECTS).limit(DataLengthLimit); 
	          OnlyMyAdsRef.get().then(function(ONEquerySnapshot) {
		              
					   if(ONEquerySnapshot.docs.length == 0 || ONEquerySnapshot.docs.length == "0"){ NoMoreLength = true; }		
		              LastAdOBJECTS = ONEquerySnapshot.docs[ONEquerySnapshot.docs.length - 1];
	               
	           		
		              ONEquerySnapshot.forEach(function(ONEdoc) {
		            
					     SaveMyAdOBJECTS(ONEdoc.data());
	               
				        });	
		
		      

	                   });
					   
		           
            
		}
		

	
		
    }

	}
	
	}

  
  
}



	
function GenerateSearchAllAds(){

    ContainerSearchAds.innerHTML = "";
	Container.style.display = "none";
	ContainerMyAds.style.display = "none";
	ContainerSearchAds.style.display = "block";
	ContainerSearchAds.scrollTop = 0; 
	SearchBox.style.height = "35px";

  setTimeout(function () {     
	if(SearchAdOBJECTS.length > 0){LoaderSpinnerRemover();}	
  }, CONTAINER_TRANSITION_SEC);		
   
	var DataLengthLimit = 10;
	var NewDate = new Date (AddDaysWithCurrentDate(2));
	var MinimumDate = new Date (MinusDaysWithCurrentDate(100));
	var firestore = firebase.firestore().collection("MainAds")
	                                    .where("updatedTime", ">", MinimumDate)
										.where("updatedTime", "<", new Date());	
	
	if(SearchAdOBJECTS.length > 0){
	  
		for(var count = 0; count < SearchAdOBJECTS.length ; count ++){
			        
                    AllAdsCreator(SearchAdOBJECTS[count],ContainerSearchAds);
		}
	   
	}
	else{
		         
			  
    
  		
    var OnlyMyAdsRef = firestore.orderBy("updatedTime", "desc").limit(DataLengthLimit); 
	OnlyMyAdsRef.get().then(function(ONEquerySnapshot) {
	
  
	LastSearchAdOBJECTS = ONEquerySnapshot.docs[ONEquerySnapshot.docs.length - 1];
	 setTimeout(function () {  LoaderSpinnerRemover(); }, 5000);
	
    ONEquerySnapshot.forEach(function(ONEdoc) {
		var DueDate = new Date(ONEdoc.data().duedate);		
	    if(NewDate > DueDate){  	   
	        return;	   
	     }	
       
	     SaveSearchAdOBJECTS(ONEdoc.data());
         
   
	
		});
		
		

	});	///////////////////////End of OnlyMyAdsRef/////////////////
    OnScrollFunction();
    function OnScrollFunction(){
        var NoMoreLength = false;			
	    var DOES_EXIST = false;	
	    ContainerSearchAds.onscroll = function (){		
		if(this.scrollTop + window.innerHeight >= this.scrollHeight && DOES_EXIST == false && NoMoreLength == false){	
		    DOES_EXIST = true; 	LoaderSpinnerAnimation();		
		    setTimeout(function () { DOES_EXIST = false; LoaderSpinnerRemover(); }, 1500);
			
		      var OnlyMyAdsRef = firestore.orderBy("updatedTime", "desc").startAfter(LastSearchAdOBJECTS).limit(DataLengthLimit); 
	          OnlyMyAdsRef.get().then(function(ONEquerySnapshot) {
		             
                  	  if(ONEquerySnapshot.docs.length == 0 || ONEquerySnapshot.docs.length == "0"){ NoMoreLength = true; }		 
		              LastSearchAdOBJECTS = ONEquerySnapshot.docs[ONEquerySnapshot.docs.length - 1];
	               
		              ONEquerySnapshot.forEach(function(ONEdoc) {
		              var DueDate = new Date(ONEdoc.data().duedate);		
	                  if(NewDate > DueDate){  	   
	                  return;	   
	                    }	
                     
					     SaveSearchAdOBJECTS(ONEdoc.data());
	               
				        });

                    
		
	                   });
					   
		            
            
		}
    } 

	}	
		
}

	
	
	
	
	


  
}




function SortingDivElmentsTimeDesc(MainContainer,NameClass){
	
	
    var GetColums = MainContainer.getElementsByClassName(NameClass);
	var GetDEStoTIMEColums = []; 
       
	for(var count = 0; count < GetColums.length ; count++){
		var x = GetColums[count];
	    GetDEStoTIMEColums.push(x);
	}
       
    var sorted = GetDEStoTIMEColums.sort(function(a,b){ a = new Date(a.getElementsByClassName("DEStoTIME")[0].innerHTML);  b = new Date(b.getElementsByClassName("DEStoTIME")[0].innerHTML); return b - a ; } ); 
    
	MainContainer.innerHTML = "";
    for( var i = 0; i < sorted.length; ++i ) {
			
		MainContainer.appendChild(sorted[i]);
		
    }
       
	
	
}



function AllAdsCreator(AdObject,conn){
		
	var AdID = AdObject.mainadinfo.id;
	var title = AdObject.mainadinfo.title;
	var imagsrc = AdObject.userphotolink;
	var adlocation = AddressSplitter(AdObject.mainadinfo.address);
	var adtimeleft = DateDiffFunction(AdObject.mainadinfo.duedate , new Date());
	
	
		
	
	var AdState = AdObject.mainadinfo.state;
	var price = AdObject.mainadinfo.budget;
	var Description = AdObject.mainadinfo.description;
	var AdPosterName = AdObject.posterinfo.name;
	var ApplyButtonText = "";
	var PriceBackGroundColor = "linear-gradient(to right, #ff0000, #ff4d4d)";
    

		
	if(AdState == "online"){
		
		ApplyButtonText = "Apply";
		
		
	}else if(AdState == "ongoing"){
		
		ApplyButtonText = "Taken";
		PriceBackGroundColor = "linear-gradient(to right, #0077b3, blue)";
		
	}
	else{
		
		ApplyButtonText = "Completed";
		PriceBackGroundColor = "linear-gradient(to right, #0077b3, blue)";
	}
	
    if(adtimeleft == "A few seconds"){
        adtimeleft = "Ended!";
		PriceBackGroundColor = "gray";
	}
	
	var ApplyButtonParaGraph;

	if(AdObject.posterinfo.uid == UserID){
		
		ApplyButtonParaGraph = "";
		
	}
	else{
		
		ApplyButtonParaGraph = "<button id='BlueSmallApplyButton' type='button' class='InfoSideAggrementsAcceptButton'> " + ApplyButtonText + " </button>";
		
	}
    
	var SearchAds = conn; 
	
	
	
	
	
	var AllAdsColum =  document.createElement("DIV");
	AllAdsColum.className = "AllAdsColum";
	AllAdsColum.id = AdID;
	AllAdsColum.innerHTML = "<p class ='DEStoTIME' hidden>" + AdObject.postedTime + " </p>"; 
	AllAdsColum.onclick = function(){
		 
	    SearchAdsFullViewCreator(AdObject);
	
	}
	
	SearchAds.appendChild(AllAdsColum);	
	
	var AllAdsLeftside =  document.createElement("DIV");
	AllAdsLeftside.className = "AllAdsLeftside";
	AllAdsLeftside.innerHTML = " <div class = 'AllAdsImageFrame'> <img class = 'AllAdsImage' src = "+ imagsrc 
	+ "></div>   <i class='fa fa-clock-o' style='color:black' > " + adtimeleft
	+ " </i> ";
	
	AllAdsColum.appendChild(AllAdsLeftside);

    AllAdsPrice = document.createElement("P");
    AllAdsPrice.className = "AllAdsPrice";	
	AllAdsPrice.innerHTML = price + " ৳"; 
	AllAdsPrice.style.background = PriceBackGroundColor;
	AllAdsLeftside.appendChild(AllAdsPrice);	
	
	var AllAdsRightside =  document.createElement("DIV");
	AllAdsRightside.className = "AllAdsRightside";
	
	AllAdsColum.appendChild(AllAdsRightside);	
	
	var AllAdsTitle =  document.createElement("DIV");
	AllAdsTitle.className = "AllAdsTitle";
	AllAdsTitle.innerHTML = title;
	
	AllAdsRightside.appendChild(AllAdsTitle);
	
	var AllAdsLocationTimeLeft =  document.createElement("DIV");
	AllAdsLocationTimeLeft.className = "AllAdsLocationTimeLeft";
	
	AllAdsRightside.appendChild(AllAdsLocationTimeLeft);
	
	var AllAdsLocation =  document.createElement("P");
	AllAdsLocation.innerHTML = "<i class='fa fa-map-marker' style='color:red'></i> " 
	+ adlocation +  ApplyButtonParaGraph 
	+ "<br> <i class='fa fa-comments-o' style='color:black'></i>" + " " + AdObject.comment +" Comments" 
	+"<br><i class='fa fa-address-card' style='color:black'></i>" + " "+ AdObject.applications + " Applications <br>" ;
	
	AllAdsLocationTimeLeft.appendChild(AllAdsLocation);
	
    SortingDivElmentsTimeDesc(SearchAds,"AllAdsColum")
	
	 
}

function SearchAdsFullViewCreator(AdObject){
	
   LoaderSpinnerAnimation();	
   ContainerSearchAds.style.display = "none";
   ContainerMyAds.style.display = "none";
   Container.innerHTML = "";
   ContainerApplications.innerHTML = "";
   ContainerApplications.style.display = "none";
   
   SearchBoxLOCKER = false;	
   if(SearchBox != null){SearchBox.style.height = "0px";}
   
   
  setTimeout(function () {     
	Container.style.display = "block";
	LoaderSpinnerRemover();	
	Container.scrollTop = 0;
  }, CONTAINER_TRANSITION_SEC);	
	
	
	var AdID = AdObject.mainadinfo.id;
	var title =  AdObject.mainadinfo.title;
	var PosterImageSrc =  AdObject.userphotolink;
	var PosterName = AdObject.posterinfo.name;
	var PosterLocation = AdObject.mainadinfo.address;
	var TimeLeft = DateDiffFunction(AdObject.mainadinfo.duedate , new Date()) +" remaining";;
	var price = AdObject.mainadinfo.budget;
	var DESCRIPTION = AdObject.mainadinfo.description;
	var AdState = AdObject.mainadinfo.state;
	
	var CommentLimit = 5;
	var OfferLimit   = 3;	

	
	var SearchAdsFullView = Container;
	
	var SearchAdsFullViewH2Title = document.createElement("DIV");
	SearchAdsFullViewH2Title.className = "SearchAdsFullViewH2Title";
	
    SearchAdsFullViewH2Title.innerHTML = title;	
	
	SearchAdsFullView.appendChild(SearchAdsFullViewH2Title);
	
	var SearchAdsFullViewContainer = document.createElement("DIV");
	SearchAdsFullViewContainer.className = "SearchAdsFullViewContainer";
	
	SearchAdsFullView.appendChild(SearchAdsFullViewContainer);
	

	if(UserID == AdObject.posterinfo.uid){
	
	var EditSearchAdsFullViewContainer = document.createElement("DIV");
	EditSearchAdsFullViewContainer.className = "EditSearchAdsFullViewContainer";
	EditSearchAdsFullViewContainer.innerHTML = "Edit";
	EditSearchAdsFullViewContainer.onclick = function() {
		
		UPDATEJobPostingFormCreator(AdObject);
		
	}
	
	SearchAdsFullViewContainer.appendChild(EditSearchAdsFullViewContainer);
	
	}
	

	
	
	var SearchAdsInfoCalum = document.createElement("DIV");
	SearchAdsInfoCalum.className = "SearchAdsInfoCalum";	
	
	SearchAdsFullViewContainer.appendChild(SearchAdsInfoCalum);
	
	var SearchAdsInfoCalumleftSide = document.createElement("DIV");
	SearchAdsInfoCalumleftSide.className = "SearchAdsInfoCalumleftSide";	
	
	SearchAdsInfoCalum.appendChild(SearchAdsInfoCalumleftSide);
	
	
	var AllAdsImageFrame = document.createElement("DIV");
	AllAdsImageFrame.className = "AllAdsImageFrame";	
	
	SearchAdsInfoCalumleftSide.appendChild(AllAdsImageFrame);
	
	var AllAdsImage = document.createElement("IMG");
	AllAdsImage.className = "AllAdsImage";
    AllAdsImage.src = PosterImageSrc;	
	AllAdsImage.onclick = function(){
		
		alert("PosterImage Pressed");
	}
	
	AllAdsImageFrame.appendChild(AllAdsImage);
	
	var SearchAdsInfoCalumrightSide = document.createElement("DIV");
	SearchAdsInfoCalumrightSide.className = "SearchAdsInfoCalumrightSide";	
	SearchAdsInfoCalumrightSide.innerHTML = "posted by";
	
	SearchAdsInfoCalum.appendChild(SearchAdsInfoCalumrightSide);
	
	var PosterNameElement = document.createElement("P");
	PosterNameElement.className = "PosterName";	
	PosterNameElement.innerHTML = PosterName;
	PosterNameElement.onclick = function(){
		alert("Profile Viewer");
	}
	
	SearchAdsInfoCalumrightSide.appendChild(PosterNameElement);
	
	var SearchAdsInfoCalum2 = document.createElement("DIV");
	SearchAdsInfoCalum2.className = "SearchAdsInfoCalum2";	
	SearchAdsInfoCalum2.innerHTML = "<table> <tr>  <td id = 'FullViewMapMarker' class='fa fa-map-marker'></td>  <td> " + PosterLocation 
	+ " </td> </tr>   <tr> <td id = 'FullViewClockMarker' class='fa fa-clock-o' ></td>  <td> " + TimeLeft 
	+ " </td> </tr> <tr>  <td id = 'FullViewClockMarker' class='fa fa-comments-o' ></td>  <td>  " + AdObject.comment 
	+ "  Comments</td> </tr>  <tr>  <td id = 'FullViewClockMarker' class='fa fa-address-card' ></td> <td>  " + AdObject.applications 
	+ " Applications</td></tr> </table>";
	
	SearchAdsFullViewContainer.appendChild(SearchAdsInfoCalum2);	
	
	var SearchAdsFullViewPriceTag = document.createElement("DIV");
	SearchAdsFullViewPriceTag.className = "SearchAdsFullViewPriceTag";
	
	SearchAdsFullViewContainer.appendChild(SearchAdsFullViewPriceTag);
	
	var SearchAdsFullViewPriceTagTitleIcon = document.createElement("DIV");
	SearchAdsFullViewPriceTagTitleIcon.className = "fa fa-money";
	SearchAdsFullViewPriceTagTitleIcon.id = "SearchAdsFullViewPriceTagTitleIcon";
	
	SearchAdsFullViewPriceTag.appendChild(SearchAdsFullViewPriceTagTitleIcon);
	
	var SearchAdsFullViewPriceText = document.createElement("P");
	SearchAdsFullViewPriceText.className = "SearchAdsFullViewPriceText";
	SearchAdsFullViewPriceText.innerHTML = price+" ৳";
	
	SearchAdsFullViewPriceTag.appendChild(SearchAdsFullViewPriceText);
	
	var SearchAdsFullViewDESCRIPTION = document.createElement("P");
	SearchAdsFullViewDESCRIPTION.className = "SearchAdsFullViewDESCRIPTION";
	SearchAdsFullViewDESCRIPTION.innerHTML = "DESCRIPTION";
	
	SearchAdsFullViewContainer.appendChild(SearchAdsFullViewDESCRIPTION);
	
	var SearchAdsFullViewDESCRIPTIONText = document.createElement("P");
	SearchAdsFullViewDESCRIPTIONText.className = "SearchAdsFullViewDESCRIPTIONText";
	SearchAdsFullViewDESCRIPTIONText.innerHTML = DESCRIPTION;
	
	SearchAdsFullViewContainer.appendChild(SearchAdsFullViewDESCRIPTIONText);
	
	if(AdObject.imgurls.length > 0){
	
	var ImageLinkButton = document.createElement("DIV");
	ImageLinkButton.style.color = "#0099e6";
	ImageLinkButton.style.background = "white";
	ImageLinkButton.innerHTML = "View Images";
	
	var ImageContainer = document.createElement("DIV");
	
	ImageLinkButton.onclick = function (){		
		var ImageFiles = AdObject.imgurls;
		AdObject.imgurls = [];
		SearchAdsFullViewContainer.removeChild(this);
		for(var count = 0 ; count < ImageFiles.length ; count++){  
		  firebase.storage().ref('MainAdPhotos/' + AdObject.mainadinfo.id + '/' + ImageFiles[count]).getDownloadURL().then(function(url) {
	          AdObject.imgurls.push(url);
			  var NewImage = document.createElement("IMG");
			  NewImage.className = "thumbNAILIMG";
			  NewImage.src = url;
			  NewImage.style.width = "100px";
			  NewImage.style.marginRight = "10px";
			  NewImage.onclick = function (){
				  Modal.style.display = "block";
                  Modalcontent.src = this.src;    
			  }
			  ImageContainer.appendChild(NewImage);
			  
          });
		  
		}
		
	}	
	SearchAdsFullViewContainer.appendChild(ImageContainer);
	SearchAdsFullViewContainer.appendChild(ImageLinkButton);
	
	}
	
	var SearchAdsFullViewDESCRIPTION = document.createElement("P");
	SearchAdsFullViewDESCRIPTION.className = "SearchAdsFullViewDESCRIPTION";
	SearchAdsFullViewDESCRIPTION.innerHTML = "OFFERS";
	
	SearchAdsFullViewContainer.appendChild(SearchAdsFullViewDESCRIPTION);
	
	var OffersZone = document.createElement("DIV");
	OffersZone.className = "CommentSectionSearchAdsFullView";
	
	SearchAdsFullViewContainer.appendChild(OffersZone);
			
	var OfferPostingRef = firebase.firestore().collection("OfferZone").where("AdID", "==", AdID).where("postedTime", "<=", new Date()).orderBy("postedTime", "asc");  											
	var LastVisibleOffer ; 
	
	OfferPostingRef.get().then(function(OffquerySnapshot) {
	
	OfferPostingRef.limit(OfferLimit).get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
	        
	        OffersByUserCreatorApplications(OffersZone,doc.data(),AdObject);
		});		
	   
			  if(querySnapshot.docs.length <= 0){
				  
	var SearchAdsFullViewDESCRIPTIONText = document.createElement("P");
	SearchAdsFullViewDESCRIPTIONText.className = "SearchAdsFullViewDESCRIPTIONText";
	SearchAdsFullViewDESCRIPTIONText.innerHTML = "No offers yet...";
	
	OffersZone.appendChild(SearchAdsFullViewDESCRIPTIONText);
				  
			  }		  
			 
	   
	          if(OffquerySnapshot.docs.length > OfferLimit){
				  
				
				LastVisibleOffer = querySnapshot.docs[querySnapshot.docs.length-1];  
				ViewAllOffersOnShowMainAdview(OffersZone , LastVisibleOffer , AdObject);
				  
				  
			  }
			
				
				
	   
		
	});
	
	
    		
	});
	
	
	
	var MakeAnOfferButton = document.createElement("P");
	MakeAnOfferButton.className = "MakeAnOfferButton";
	MakeAnOfferButton.innerHTML = "Make an offer";
	
	if(AdState == "ongoing" || UserID == AdObject.posterinfo.uid){
	      
		  MakeAnOfferButton.style.background = OnlneOfflineColor("Ash");
		 
	
    }
	else{
		
	MakeAnOfferButton.onclick = function(){
		
		 CheckIfUserSubmittedOffer(AdObject);
	           }
		
	}
	
	SearchAdsFullViewContainer.appendChild(MakeAnOfferButton);
	
	var SearchAdsFullViewDESCRIPTION = document.createElement("P");
	SearchAdsFullViewDESCRIPTION.className = "SearchAdsFullViewDESCRIPTION";
	SearchAdsFullViewDESCRIPTION.innerHTML = "COMMENTS";
	
	SearchAdsFullViewContainer.appendChild(SearchAdsFullViewDESCRIPTION);

	
	var CommentZone = document.createElement("DIV");
	CommentZone.className = "CommentSectionSearchAdsFullView";
	
	SearchAdsFullViewContainer.appendChild(CommentZone);
	
	var CommentPostingRef = firebase.firestore().collection("MainAds").doc(AdID).collection("CommentZone").orderBy("postedTime", "asc");  											
	var LastVisibleComment ;
	
	CommentPostingRef.get().then(function(CommentquerySnapshot) {
	
	CommentPostingRef.limit(CommentLimit).get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {         
	           

			   
			   QuestionAskCreator (CommentZone , doc.data() , AdObject);
												 
	    
	   });		
	          
			  if(CommentquerySnapshot.docs.length <= 0){
				  
	var SearchAdsFullViewDESCRIPTIONText = document.createElement("P");
	SearchAdsFullViewDESCRIPTIONText.className = "SearchAdsFullViewDESCRIPTIONText";
	SearchAdsFullViewDESCRIPTIONText.innerHTML = "No Comments yet...";
	
	CommentZone.appendChild(SearchAdsFullViewDESCRIPTIONText);
				  
			  }
			  
			  
	          if(CommentquerySnapshot.docs.length > CommentLimit){
				  
				
				LastVisibleComment = querySnapshot.docs[querySnapshot.docs.length-1];  
				ViewAllCommentsOnShowMainAdview(CommentZone , LastVisibleComment , AdObject );
				
				  
				  
			  }
	   
	    
	   	});
		
	});

	
    var AdQuestionWriterColum = document.createElement("DIV");
	AdQuestionWriterColum.className = "AdQuestionWriterColum";
	
	SearchAdsFullViewContainer.appendChild(AdQuestionWriterColum);
	
	var SubmitButtonQuesWriter = document.createElement("DIV");
	SubmitButtonQuesWriter.className = "SubmitButtonQuesWriter";
	SubmitButtonQuesWriter.innerHTML = " <div class='fa fa-send' ></div>";
	SubmitButtonQuesWriter.onclick = function () {
		SaveComment();
	}
	
	AdQuestionWriterColum.appendChild(SubmitButtonQuesWriter);
	
	var ConversationInputFieldFRAME = document.createElement("DIV");
	ConversationInputFieldFRAME.className = "ConversationInputFieldFRAME";
	
	AdQuestionWriterColum.appendChild(ConversationInputFieldFRAME);
	
	var ConversationInputField = document.createElement("INPUT");
	ConversationInputField.className = "form-control";
	ConversationInputField.id = "ConversationInputField";
	ConversationInputField.placeholder = "Write your comment...";
	ConversationInputField.onfocus = function(){
		ConversationInputField.style.height = "85px";
		ConversationInputFieldFRAME.style.height = "115px";
	}
	ConversationInputField.onblur = function(){
		ConversationInputField.style.height = "35px";
		ConversationInputFieldFRAME.style.height = "65px";
	}
	ConversationInputField.onkeypress = function(e){			
			if(e.keyCode == 13){				
			   SaveComment();			
			}		
		}
	
	function SaveComment(){		
		if(ConversationInputField.value == ""){}
		else{
		   var QuesOBJECT = { QuesID : GenerateNewIDfromDatabase() , AdID : AdObject.mainadinfo.id , QposterID : UserID , comment : ConversationInputField.value } 
		   ConversationInputField.value = "";
		   QuestionSaverDataBase(QuesOBJECT , CommentZone , AdObject );
		   
		}  
	}
	
	ConversationInputFieldFRAME.appendChild(ConversationInputField);
	
	
	
}

function ViewAllCommentsOnShowMainAdview(CommentZone , LastVisible , AdObject ){
	
	var AdID = AdObject.mainadinfo.id;
	var ViewMoreButton = document.createElement("P");
	ViewMoreButton.className = "ViewMoreButton";
	ViewMoreButton.innerHTML = "View All Comments";
	ViewMoreButton.onclick = function (){	
	var SearchAdsFullViewQues = firebase.firestore().collection("MainAds").doc(AdID).collection("CommentZone").orderBy("postedTime", "asc").startAfter(LastVisible);  											
	
	
	SearchAdsFullViewQues.get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {         
	           
               QuestionAskCreator (CommentZone , doc.data() , AdObject);
			   
			
	   });		
	          
	           CommentZone.removeChild(ViewMoreButton);
		
	});

	
		
		
		
	}
	
	CommentZone.appendChild(ViewMoreButton);
	
	
	
	
}

function QuestionSaverDataBase(QuesObj , CommentZone , AdObject ){	
	
	      var QuesQuesID = QuesObj.QuesID;
	      var QuesAdID = QuesObj.AdID;
		  var QuesposterID =  QuesObj.QposterID;
		  var QuesposterComment =  QuesObj.comment;
	      var QuesSaverRef = firebase.firestore().doc("MainAds/" + QuesAdID + "/CommentZone/" + QuesQuesID);
		  
		  var QUESOBJ = { id : QuesQuesID , 
						  quesAdID : QuesAdID ,
		                  qposterID : QuesposterID,
						  comment : QuesposterComment,
					      postedTime : new Date() }
						  
		  QuestionAskCreator(CommentZone, QUESOBJ , AdObject);
		
     		QuesSaverRef.set({
		                    
							id : QuesQuesID , 
						    quesAdID : QuesAdID ,
		                    qposterID : QuesposterID,
							comment : QuesposterComment,
							postedTime : new Date()
		
		
	                        }).catch(function(error) {	
	                        
							alert("Something went wrong");
		
                            });

	
}

function QuestionAskCreator (Zone , QuesObj , AdObject){
	
    var ParaColor;		

	var CommentDescribe = QuesObj.comment;
	var TimeAgo = DateDiffFunction( new Date() , QuesObj.postedTime);
	
	var MainColumn = document.createElement("DIV");
	MainColumn.className = "CommentColumn";		
	Zone.appendChild(MainColumn);
	
	firebase.firestore().collection("Users").doc(QuesObj.qposterID).get().then(function(USERdoc) {
	
    	
	 firebase.storage().ref('UserProPics/' + USERdoc.id + '/Propic.png').getDownloadURL().then(function(url) {
	 
	
	var leftSideComment = document.createElement("DIV");
	leftSideComment. className = "leftSideComment";		
	MainColumn.appendChild(leftSideComment);
	
	var AllAdsImageFrame = document.createElement("DIV");
	AllAdsImageFrame. className = "AllAdsImageFrame";		
	leftSideComment.appendChild(AllAdsImageFrame);
	
	var AllAdsImage = document.createElement("IMG");
	AllAdsImage. className = "AllAdsImage";		
	AllAdsImage.src = url;
	AllAdsImageFrame.appendChild(AllAdsImage);	
	
	var rightSideComment = document.createElement("DIV");
	rightSideComment. className = "rightSideComment";		
	MainColumn.appendChild(rightSideComment);
	
	var PosterName = document.createElement("DIV");
	PosterName. className = "PosterName";
    PosterName.innerHTML = NameSplitter(USERdoc.data().name);
	rightSideComment.appendChild(PosterName);
	
	var reportIcon = document.createElement("DIV");
	reportIcon.id = "reportIcon";
    reportIcon.className = "fa fa-flag";
    reportIcon.onclick = function(){ alert("Report"); }	
	rightSideComment.appendChild(reportIcon);
	
	var commentPara = document.createElement("DIV");
	commentPara.className = "commentPara";
	if(USERdoc.id == AdObject.posterinfo.uid){
	   commentPara.style.background = "#3399ff";
	   commentPara.style.color = "white";
	}
	else{
	   MainColumn.className = "ReplyColumn";	
	}
    commentPara.innerHTML = CommentDescribe;	
	rightSideComment.appendChild(commentPara);
	
	
	var TimeComment = document.createElement("DIV");
	TimeComment. className = "TimeComment";	
    TimeComment.innerHTML = "<div class = 'TimeSmallText'> " + TimeAgo + " </div>";	
	MainColumn.appendChild(TimeComment);
	
	
	
	
	     });	 
	
	
	});	 
	
	
		
}


function ViewAllOffersOnShowMainAdview(OffersZone , LastVisible , AdObject ){
	

	var ViewMoreButton = document.createElement("P");
	ViewMoreButton.className = "ViewMoreButton";
	ViewMoreButton.innerHTML = "View All Offers";
	ViewMoreButton.onclick = function (){	
		
    var SearchAdsFullViewOfferRef = firebase.firestore().collection("OfferZone").where("AdID", "==", AdObject.mainadinfo.id).where("postedTime", "<=", new Date()).orderBy("postedTime", "asc").startAfter(LastVisible);  											
	
	SearchAdsFullViewOfferRef.get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {   
	
			OffersByUserCreatorApplications(OffersZone,doc.data(),AdObject);		
	    
	   });		
	   
	
	   OffersZone.removeChild(ViewMoreButton);
		
	});
		
		
		
	}
	
	OffersZone.appendChild(ViewMoreButton);
	
	
	
	
}


function CheckIfUserSubmittedOffer(AdObject){
	
	var TempAdID = AdObject.mainadinfo.id; 
	
	var IfOfferExistRef = firebase.firestore().collection("OfferZone").where("offerposterID", "==", UserID).where("AdID", "==", TempAdID);
	
	IfOfferExistRef.get().then(function(OnlyMyquerySnapshot) {
		
		 if(OnlyMyquerySnapshot.docs.length > 0){
			 
			 alert("You already Posted an offer!");
			 
		 }
		 else{
			 
			  var VerifiedUser = firebase.firestore().collection("VerifiedUSERS").doc(UserID);
	            VerifiedUser.get().then(function(doc) {
                if (doc.exists) {
                    OfferSubmissionForm(AdObject);
                } else {
					alert("You are not Verified!");
					 OfferSubmissionForm(AdObject);
       
                }            
            });
			 
		 }
	

   });
	
	

	
}


 function OfferSubmissionForm(AdObject){
	 
   LoaderSpinnerAnimation();	
   ContainerSearchAds.style.display = "none";
   ContainerMyAds.style.display = "none";
   Container.innerHTML = "";
   
   SearchBoxLOCKER = false;	
   if(SearchBox != null){SearchBox.style.height = "0px";}
   
  setTimeout(function () {
	  
	Container.style.display = "block"; 
	LoaderSpinnerRemover();	
	Container.scrollTop = 0;
	 
	var AdId = AdObject.mainadinfo.id;
    var MinPrice = AdObject.mainadinfo.budget;
	var ShowMinPrice = MinPrice;
	
	var OfferNewDiv = Container;
	 
	var SearchAdsFullViewH2Title = document.createElement("DIV");
	SearchAdsFullViewH2Title.className = "SearchAdsFullViewH2Title";	
    SearchAdsFullViewH2Title.innerHTML = AdObject.mainadinfo.title;	
	
	OfferNewDiv.appendChild(SearchAdsFullViewH2Title);
	
	var AllinOneDivContainer = document.createElement("DIV");
	AllinOneDivContainer.className = "AllinOneDivContainer";
	
	OfferNewDiv.appendChild(AllinOneDivContainer);
		
	var FormGroupDiv = document.createElement("DIV");
	FormGroupDiv.className = "form-group";
	FormGroupDiv.innerHTML = "OFFER DESCRIPTION ";   	// This FORMGRPUP DIV IS FOR THE DESCRIPTION
	FormGroupDiv.style.marginRight = "15px";
	FormGroupDiv.style.marginLeft = "15px";
	FormGroupDiv.style.marginTop = "10px";
	FormGroupDiv.style.marginBottom = "10px";
	
	AllinOneDivContainer.appendChild(FormGroupDiv);
	
	var TickIcon = document.createElement("I");
	FormGroupDiv.appendChild(TickIcon);
	
	var OfferDescriptTextArea = document.createElement("TEXTAREA");
	OfferDescriptTextArea.className = "form-control";
	OfferDescriptTextArea.style.width = "100%";
	OfferDescriptTextArea.style.height = "120px";
	OfferDescriptTextArea.type = "text";
	OfferDescriptTextArea.placeholder = "Hello Sir/Madam...";
	OfferDescriptTextArea.oninput = function (){
		
		OfferDescriptionValidator(this.value , TickIcon , SendOffer , PriceAmount , AdObject );
		
		
	}	
  

	FormGroupDiv.appendChild(OfferDescriptTextArea);
	
	var SearchAdsFullViewDESCRIPTION = document.createElement("P");
	SearchAdsFullViewDESCRIPTION.className = "SearchAdsFullViewDESCRIPTION";
	SearchAdsFullViewDESCRIPTION.innerHTML = "Your Price";
	SearchAdsFullViewDESCRIPTION.style.marginTop = "30px"
	
	FormGroupDiv.appendChild(SearchAdsFullViewDESCRIPTION);
	
	var PriceAmount = document.createElement("DIV");
	PriceAmount.className = "PriceAmount"; 
	
	PlusMinusIncreaserWithMiddleText(AllinOneDivContainer , MinPrice , PriceAmount) ;
	 
	var SendOffer = document.createElement("BUTTON");             // This FORMGRPUP DIV IS FOR THE UPLOAD FILES
	SendOffer.className = "btn btn-info btn-lg btn-block";	
	SendOffer.innerHTML = "Send Offer";
	SendOffer.style.background = OnlneOfflineColor("Ash");	
	 
	AllinOneDivContainer.appendChild(SendOffer); 		 
	 
	}, CONTAINER_TRANSITION_SEC);	
	 
 }
 
 
function OfferDescriptionValidator(OfferDesVal , tickmark , OfferButton , PriceAmount , AdObject){
	
	
	
	if (OfferDesVal.length > 9 && OfferDesVal.length < 1000){
		   
			tickmark.className="fa fa-check-square-o";
			tickmark.style.color = "#33cc33";
			OfferButton.style.background  = OnlneOfflineColor("Green");
			OfferButton.onclick = function(){
				
				
				var OfferPrice = Number(PriceAmount.innerHTML);
				
				SaveTheOfferOnMainAds(AdObject, OfferDesVal , OfferPrice , OfferButton);
				
				
				
			}
	}	
	else{
		
	   tickmark.className = "";
	   OfferButton.style.background  = OnlneOfflineColor("Ash");
	   OfferButton.onclick = function(){
				
				alert("null");
				
			}
	}
	
	
	
	
}

function SaveTheOfferOnMainAds(AdObject , OfferDes , OfferPrice , OfferButton){
	 
	   
			   var price = Number(OfferPrice);
			   var TemplateID = AdObject.mainadinfo.id;			   
			   var NewOfferID = GenerateNewIDfromDatabase();
			  		 	   
			   var OfferZoneRef = firebase.firestore().doc("OfferZone/" + NewOfferID);
			   
			   	OfferButton.innerHTML = "";
				OfferButton.disabled = true;
	            OfferButton.style.backgroundColor =  OnlneOfflineColor("online");
	            OfferButton.className = "rotatorclass";
			
		
			 OfferZoneRef.set({
		                   
						    id : NewOfferID , 
							offerposterID : UserID,
							postedTime : new Date(),
							offerprice : price,
							offerDescription : OfferDes ,
							AdID : TemplateID,
							AdposterID : AdObject.posterinfo.uid
		
		
	                        }).then(function(){	
							
							ConfirmAnimation();
							 
					 setTimeout(function(){
						 
						 for(var count = 0 ; count < SearchAdOBJECTS.length; count++){
							 
							 if(SearchAdOBJECTS[count].mainadinfo.id == AdObject.mainadinfo.id){
								 SearchAdOBJECTS[count].applications = SearchAdOBJECTS[count].applications + 1;
								 SearchAdsFullViewCreator(SearchAdOBJECTS[count]);
							 }
						 }
	 
                      
		
                     }, 1950);
							
				});
		

 }
 
 function PlusMinusIncreaserWithMiddleText(MainElement , MinPrice , PriceAmount){
	
	var ShowMinPrice = MinPrice;
	
	var PriceIncreaserDiv = document.createElement("DIV");
	PriceIncreaserDiv.className = "PriceIncreaserDiv";                
	
	MainElement.appendChild(PriceIncreaserDiv);
	
	var PriceAmountMinus = document.createElement("DIV");
	PriceAmountMinus.className = "PriceAmountMinus";                
	
	PriceIncreaserDiv.appendChild(PriceAmountMinus);
	
	var PriceAmountMinusICON = document.createElement("I");
	PriceAmountMinusICON.className = "fa fa-minus-square";
    PriceAmountMinusICON.style.color = OnlneOfflineColor("null")    
    PriceAmountMinusICON.onclick = function(){		
		
		if(ShowMinPrice <= MinPrice ){
			
			this.style.color = OnlneOfflineColor("null");
			ShowMinPrice = MinPrice;
		    PriceAmount.innerHTML = ShowMinPrice;
		   
			
		}
		else{
			
			this.style.color = "red";
			ShowMinPrice = ShowMinPrice - 10;
			PriceAmount.innerHTML = ShowMinPrice;
		   
		
			
		}
		
		
	}	
	
	PriceAmountMinus.appendChild(PriceAmountMinusICON);
	
	var PriceAmountPlus = document.createElement("DIV");
	PriceAmountPlus.className = "PriceAmountPlus";                
	
	PriceIncreaserDiv.appendChild(PriceAmountPlus);
	
	var PriceAmountPlusICON = document.createElement("I");
	PriceAmountPlusICON.className = "fa fa-plus-square";  
    PriceAmountPlusICON.style.color = OnlneOfflineColor("online");	
    PriceAmountPlusICON.onclick = 	function(){
		
	      if (ShowMinPrice  >= 5000 ){
			
			this.style.color = OnlneOfflineColor("null");
			ShowMinPrice = 5000;
			PriceAmount.innerHTML = ShowMinPrice;
		}
		else{
			
			this.style.color = OnlneOfflineColor("online");
			ShowMinPrice = ShowMinPrice + 10;
			PriceAmount.innerHTML = ShowMinPrice;
			PriceAmountMinusICON.style.color = "red";
			
		}
		
	}	
	
	PriceAmountPlus.appendChild(PriceAmountPlusICON);
	
	
    PriceAmount.innerHTML = ShowMinPrice;	
	
	
	PriceIncreaserDiv.appendChild(PriceAmount);
	
	
	
	
	
}

 
function OffersByUserCreatorApplications(OfferZone,OfferOject,AdObject){


var AcceptButton = "";  


var OfferObj = { offerinfo : OfferOject , posterinfo : null , mainadinfo : AdObject , userphotolink : null , postedTime : OfferOject.postedTime };
 
var adtimeleft = DateDiffFunction(OfferObj.mainadinfo.duedate , new Date());

    if(UserID == AdObject.posterinfo.uid && adtimeleft != "A few seconds"){
	   AcceptButton = "<button class = 'InfoSideAggrementsAcceptButton'> Accept </button>";
	   function CoverOnclick(){ OffersByUserCreatorApplicationsFullViewer(OfferObj);}
	} 
	
firebase.firestore().collection("Users").doc(OfferOject.offerposterID).get().then(function(USERdoc) {
	 OfferObj.posterinfo = USERdoc.data();
    	
	 firebase.storage().ref('UserProPics/' + USERdoc.id + '/Propic.png').getDownloadURL().then(function(url) {
	 OfferObj.userphotolink = url;  
           
	var OfferID = OfferObj.offerinfo.id ;  
	var UserName = OfferObj.posterinfo.name;
	var price = OfferObj.offerinfo.offerprice + " ৳  ";
	var priceText = price;
	var ProImage = OfferObj.userphotolink; 
	
	UserName = NameSplitter(UserName);
	
	var Cover = document.createElement("DIV");	
	Cover.className = "Cover";
	Cover.innerHTML = "<p class ='DEStoTIME' hidden>" + OfferObj.offerinfo.postedTime + " </p>";
	
	OfferZone.appendChild(Cover);
					
	var MyAggreemts = document.createElement("DIV");
	MyAggreemts.className = "MyAggrementsColumn";
	MyAggreemts.id = OfferID;
	MyAggreemts.onclick = function(){
		
		CoverOnclick();
	
	}	
	Cover.appendChild(MyAggreemts);
	
	var ImageSideAggrements = document.createElement("DIV");
	ImageSideAggrements.className = "ImageSideAggrements";
	ImageSideAggrements.innerHTML = " <div class = 'AllAdsImageFrame'>  <img class= 'AllAdsImage' src= " + ProImage+ ">  </div>";
		
	MyAggreemts.appendChild(ImageSideAggrements);
	
	var InfoSideAggrements = document.createElement("DIV");
	InfoSideAggrements.className = "InfoSideAggrements";
	InfoSideAggrements.innerHTML = " <div class = 'PosterName' >" + UserName + "  </div> <div style = 'font-style: italic' ><i style='font-size:medium;font-weight:bold;color:#00cc00'>" + priceText + "</i> for <i  style='font-size:medium;font-weight:bold' > this Job</i>   " + AcceptButton + "  </div>";
		
	MyAggreemts.appendChild(InfoSideAggrements);
	
	
	
	SortingDivElmentsTimeASC(OfferZone,"Cover");
			
	     
			
		
				  
      });
		
}); 
                                   

	
}



function SortingDivElmentsTimeASC(MainContainer,NameClass){
	
	
    var GetColums = MainContainer.getElementsByClassName(NameClass);
	var GetDEStoTIMEColums = []; 
       
	for(var count = 0; count < GetColums.length ; count++){
		var x = GetColums[count];
	    GetDEStoTIMEColums.push(x);
	}
       
    var sorted = GetDEStoTIMEColums.sort(function(a,b){ a = new Date(a.getElementsByClassName("DEStoTIME")[0].innerHTML);  b = new Date(b.getElementsByClassName("DEStoTIME")[0].innerHTML); return a - b ; } ); 
    
	MainContainer.innerHTML = "";
    for( var i = 0; i < sorted.length; ++i ) {
			
		MainContainer.appendChild(sorted[i]);
		
    }
       
	
	
}

 function OffersByUserCreatorApplicationsFullViewer(OfferObj){	

    ContainerApplications.innerHTML = "";
	Container.style.display = "none";
	ContainerMyAds.style.display = "none";
	ContainerSearchAds.style.display = "none";
	ContainerApplications.style.display = "block";
	ContainerApplications.scrollTop = 0; 
	SearchBoxLOCKER = false;	
    if(SearchBox != null){SearchBox.style.height = "0px";}
                                   
	var OfferID = OfferObj.offerinfo.id ;  
	var UserName = OfferObj.posterinfo.name;
	var price = OfferObj.offerinfo.offerprice + " ৳  ";
	var priceText = price;
	var ProImage = OfferObj.userphotolink; 
					
	var MyAggreemts = document.createElement("DIV");
	MyAggreemts.className = "MyAggrementsColumn";
	MyAggreemts.style.height = "auto";
	MyAggreemts.style.fontSize = "auto";
	MyAggreemts.id = OfferID;
		
	ContainerApplications.appendChild(MyAggreemts);
	
	var ImageSideAggrements = document.createElement("DIV");
	ImageSideAggrements.className = "ImageSideAggrements";
	ImageSideAggrements.innerHTML = " <div class = 'AllAdsImageFrame'>  <img class= 'AllAdsImage' src= " + ProImage+ ">  </div>";
		
	MyAggreemts.appendChild(ImageSideAggrements);
	
	var InfoSideAggrements = document.createElement("DIV");
	InfoSideAggrements.className = "InfoSideAggrements";
	InfoSideAggrements.innerHTML = " <div class = 'PosterName' >" + UserName + "  </div> <div style = 'font-style: italic' ><i style='font-size:large;font-weight:bold;color:#00cc00'>" + priceText + "</i> for this Job </div>";
		
	MyAggreemts.appendChild(InfoSideAggrements);	
	
	firebase.firestore().collection("Agreements").doc(OfferObj.mainadinfo.mainadinfo.id).get().then(function(querySnapshot) {
		if (querySnapshot.exists) {
			
			   var AggEnds = document.createElement("P");
	           AggEnds.className = "SearchAdsFullViewDESCRIPTION";
			   AggEnds.style.margin = "3px 0px 3px 0px";
			   AggEnds.innerHTML = "Agreement Ends in";
	           MyAggreemts.appendChild(AggEnds);
			
			   // CountdownTimer Starting Point
			   
			   var StopWatchDiv = document.createElement("DIV");
	           StopWatchDiv.className = "StopWatchDiv"; 			   
			   var countDownDate = new Date(OfferObj.mainadinfo.mainadinfo.duedate).getTime();
			   var x = setInterval(function() {
  
               var now = new Date().getTime();    
               var distance = countDownDate - now;
    
    
               var days = Math.floor(distance / (1000 * 60 * 60 * 24));
               var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
               var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
               var seconds = Math.floor((distance % (1000 * 60)) / 1000);    
   
               StopWatchDiv.innerHTML = days + "d " + hours + "h "
               + minutes + "m " + seconds + "s "; 
    
               if (distance < 0) {
                  clearInterval(x);
                  StopWatchDiv.innerHTML = "EXPIRED";
                    }
               }, 1000);		   
             	   
	
	           MyAggreemts.appendChild(StopWatchDiv);
			   
			   // CountdownTimer Ending Point
			   
			   var MessangeBox = document.createElement("DIV");
	           MessangeBox.className = "MessangeBox"; 
               MessangeBox.innerHTML = "zzzz";		   
	
	           MyAggreemts.appendChild(MessangeBox);
      
           }
	    else {
			
			   var OfferDesTitleTEXT = document.createElement("P");
	           OfferDesTitleTEXT.className = "SearchAdsFullViewDESCRIPTIONText";
	           OfferDesTitleTEXT.style.padding = "10px 10px 10px 10px";
	           OfferDesTitleTEXT.innerHTML = OfferObj.offerinfo.offerDescription;
	
	           MyAggreemts.appendChild(OfferDesTitleTEXT);
	
	           var AggreementDesBox = document.createElement("DIV");
	           AggreementDesBox.className = "AggreementDesBox";
	           AggreementDesBox.innerHTML = "<p class =  'LegalInfoTitle' >Legal Information</p> " + "<p class =  'LegalInfo' >It Starts with u</p> ";
	
	           MyAggreemts.appendChild(AggreementDesBox);
			   
			   var MakeAgrmntButton = document.createElement("P");
	           MakeAgrmntButton.className = "MakeAnOfferButton";
	           MakeAgrmntButton.innerHTML = "Accept Offer";
	           MakeAgrmntButton.onclick = function(){
		       AgreementSaver(OfferObj.offerinfo,OfferObj);
	           }
	
	           MyAggreemts.appendChild(MakeAgrmntButton);
       
            }		
	});
	
	
		
}


 
 function AgreementSaver(OfferObj,NewOfferOBJ){
	 
	
	 var AgreementID = OfferObj.AdID;
	 var AdPosterID = OfferObj.AdposterID;
	 var OfferID = OfferObj.id;
	 var OfferPosterID = OfferObj.offerposterID;
	 
	          
	var AggRef = firebase.firestore().doc("Agreements/" + AgreementID);
	 
	  AggRef.set({
		                   
				 id : AgreementID , 
				 offerID : OfferID,
		         offerposter: OfferPosterID,
				 adposterID : AdPosterID,
				 postedTime : new Date()
		
		}).then(function(){	
							
		ConfirmAnimation();
		OffersByUserCreatorApplicationsFullViewer(NewOfferOBJ);	
        var UpdateMainAdsRef = firebase.firestore().collection("MainAds").doc(AgreementID);
		return UpdateMainAdsRef.update({state : "ongoing"}).then(function() {
			for(var count = 0 ; count < MyAdOBJECTS.length ; count++){
				if(MyAdOBJECTS[count].mainadinfo.id == AgreementID){
				   MyAdOBJECTS[count].mainadinfo.state = "ongoing";
				}
				
			}
		});		
							
	    });
	 
	 
	 
	 
 }

  function GenerateAllAggrements(){
	 
	var DataLengthLimit = 10;
	var firestore1 = firebase.firestore().collection("Agreements")
	                                    .where("adposterID", "==", UserID);
	var firestore2 = firebase.firestore().collection("Agreements")
	                                    .where("offerposter", "==", UserID);
										
	ContainerMyAggrements.style.display = "block";
   	ContainerMyAggrements.innerHTML = "";
	Container.style.display = "none";
	ContainerMyAds.style.display = "none";
	ContainerSearchAds.style.display = "none";
	ContainerSearchAds.scrollTop = 0; 
	SearchBox.style.height = "35px";      
			  
    
  		
    var ThisRef1 = firestore1.orderBy("postedTime", "desc").limit(DataLengthLimit); 
	ThisRef1.get().then(function(ONEquerySnapshot) {
  
	LastAggrementAdPost = ONEquerySnapshot.docs[ONEquerySnapshot.docs.length - 1];
	
	
    ONEquerySnapshot.forEach(function(ONEdoc) {
	
       
	      AggrementsColumnCreator(ONEdoc.data());
         
		});
		
		

	});
	
	var ThisRef2 = firestore2.orderBy("postedTime", "desc").limit(DataLengthLimit); 
	ThisRef2.get().then(function(ONEquerySnapshot) {
  
	LastAggrementOfferPost = ONEquerySnapshot.docs[ONEquerySnapshot.docs.length - 1];
	
	
    ONEquerySnapshot.forEach(function(ONEdoc) {
	
       
	      AggrementsColumnCreator(ONEdoc.data());
         
		});
		
		

	});
  
       OnScrollFunction();
    function OnScrollFunction(){
        var NoMoreLength = false;			
	    var DOES_EXIST = false;	
	    ContainerMyAggrements.onscroll = function (){		
		if(this.scrollTop + window.innerHeight >= this.scrollHeight && DOES_EXIST == false && NoMoreLength == false){	
		    DOES_EXIST = true; 	LoaderSpinnerAnimation();		
		    setTimeout(function () { DOES_EXIST = false; LoaderSpinnerRemover(); }, 1500);
			
    var ThisRef1 = firestore1.orderBy("postedTime", "desc").limit(DataLengthLimit).startAfter(LastSearchAdOBJECTS); 
	ThisRef1.get().then(function(ONEquerySnapshot) {
  
	LastAggrementOBJECT = ONEquerySnapshot.docs[ONEquerySnapshot.docs.length - 1];
	
	
    ONEquerySnapshot.forEach(function(ONEdoc) {
	
       
	      AggrementsColumnCreator(ONEdoc.data());
         
		});
		
		

	});
	
	var ThisRef2 = firestore2.orderBy("postedTime", "desc").limit(DataLengthLimit).startAfter(LastSearchAdOBJECTS); 
	ThisRef2.get().then(function(ONEquerySnapshot) {
  
	LastAggrementOBJECT = ONEquerySnapshot.docs[ONEquerySnapshot.docs.length - 1];
	
	
    ONEquerySnapshot.forEach(function(ONEdoc) {
	
       
	      AggrementsColumnCreator(ONEdoc.data());
         
		});
		
		

	});
					   
		            
            
		}
    } 

	}	
	
	
		
	 
	 
 }
  


function AggrementsColumnCreator(Aggrements){
	
	var AdObject;
	var AdPoster;
	var AdPosterImage;
	var OfferInfo;
	var OfferPoster;
	var OfferPosterImage;
  		
    firebase.firestore().collection("MainAds").doc(Aggrements.id).get().then(function(ONEquerySnapshot) {
	
	AdObject = ONEquerySnapshot.data();
	
						    	
	firebase.firestore().collection("Users").doc(AdObject.posterID).get().then(function(AdUSERdoc) {
		 
	 
	AdPoster = AdUSERdoc.data();  	
    
	 firebase.storage().ref('UserProPics/' + AdObject.posterID + '/Propic.png').getDownloadURL().then(function(url) {
	 AdPosterImage = url;  
	 
	  firebase.firestore().collection("OfferZone").doc(Aggrements.offerID).get().then(function(OfferData) {
	   OfferInfo = OfferData.data();
	   
	   firebase.firestore().collection("Users").doc(OfferInfo.offerposterID).get().then(function(OfferUser) {
	   OfferPoster = OfferUser.data();
	   
	   firebase.storage().ref('UserProPics/' + OfferInfo.offerposterID + '/Propic.png').getDownloadURL().then(function(url) {
	  OfferPosterImage = url;  
	  
	  
	var UserName = OfferPoster.name;
	var price = OfferInfo.offerprice + " ৳  ";
	var priceText = price;
	
	var ProImage = "";
	
	if(UserID == AdPoster.uid){
	   ProImage = OfferPosterImage;
	}
	else{
	   ProImage = AdPosterImage;
	}
	
	 
	
	UserName = NameSplitter(UserName);
	
	var Cover = document.createElement("DIV");	
	Cover.className = "Cover";
	Cover.innerHTML = "<p class ='DEStoTIME' hidden>" + Aggrements.postedTime + " </p>";
	
	ContainerMyAggrements.appendChild(Cover);
					
	var MyAggreemts = document.createElement("DIV");
	MyAggreemts.className = "MyAggrementsColumn";
	MyAggreemts.style.minHeight = "75px";
	MyAggreemts.onclick = function(){
		
		CoverOnclick();
	
	}	
	Cover.appendChild(MyAggreemts);
	
	var ImageSideAggrements = document.createElement("DIV");
	ImageSideAggrements.className = "ImageSideAggrements";
	ImageSideAggrements.innerHTML = " <div class = 'AllAdsImageFrame'>  <img class= 'AllAdsImage' src= " + ProImage+ ">  </div>";
		
	MyAggreemts.appendChild(ImageSideAggrements);
	
	var InfoSideAggrements = document.createElement("DIV");
	InfoSideAggrements.className = "InfoSideAggrements";
	InfoSideAggrements.innerHTML = " <div class = 'PosterName' >" + UserName + "  </div> ";
		
	MyAggreemts.appendChild(InfoSideAggrements);
	
	
	
	SortingDivElmentsTimeASC(ContainerMyAggrements,"Cover");
			

	     
	   
	   
	   	}); 
	
	 	}); 
	   
	
	 	});  
					   
		
		});  
					   
		});
					   
		  
					   
	});
	
}
 
// Extraaaaaaaaaa




function AddDaysWithCurrentDate( NumberofDays){
	

	var Sampledate = new Date();
	Sampledate.setDate(Sampledate.getDate() + NumberofDays );
	
    var Year = Sampledate.getFullYear();
    var Month = Sampledate.getMonth()+ 1;
   if(Month <= 9){ Month = "0"+Month; }
    var Day = Sampledate.getDate();
    if(Day <= 9){ Day = "0"+Day; }	
	
	
	var ResultDate = Year+"-"+Month+"-"+Day ;
	

	
	return ResultDate;

	
}



function MinusDaysWithCurrentDate( NumberofDays){
	

	var Sampledate = new Date();
	Sampledate.setDate(Sampledate.getDate() - NumberofDays );
	
    var Year = Sampledate.getFullYear();
    var Month = Sampledate.getMonth()+ 1;
   if(Month <= 9){ Month = "0"+Month; }
    var Day = Sampledate.getDate();
    if(Day <= 9){ Day = "0"+Day; }	
	
	var ResultDate = Year+"-"+Month+"-"+Day ;
	
	return ResultDate;
	
	
	
	
}

function GenerateNewIDfromDatabase(){
	
	
	var firestore = firebase.firestore();
		 
	var IDGenerate = firestore.collection("Users").doc(); 

    var Auto = IDGenerate.id;
	
	return Auto;
	
	
	
	
}



function OnlneOfflineColor(state){
	
	if(state == "Green"){
		
		return "#00e600";
		
	}
	else if (state == "ongoing"){
		
		return "#3399ff";
		
	}
	else if (state == "online"){
		
		return "#4da6ff";
		
	}
	
	else if("Ash"){
		
		return "#8c8c8c";
		
	}
	else if("DeppBlue"){
		
		return "#0077b3";
		
	}	
		
		
	
	
}



function AddressSplitter(str) {
	
	
    var res = str.split(",");
	var varVerify = res[1].indexOf("Dhaka");
	if(varVerify > 0 ){
			 
		res[1] = " Dhaka";
			
	}
	
	
	var Ad = res[0] + "," + res[1];
  
  
  return Ad;
  
}


function NameSplitter(str) {	
    var res = str.split(" ");  
  
  if(res.length > 1){
	  return res[res.length - 1][0] + ". " + res[0];	  
  }
  else{  return  res[0];  }
  
}

function DateDiffFunction(EndDate , StartDate){

	var  DateDifference  = new Date(EndDate - StartDate);
	var StringExtention;
  
  if(DateDifference/1000 <= 60){
  
     return "A few seconds";
   }   
  else if(DateDifference/1000/60 <= 60){
	  
	    
    var x = Math.floor(DateDifference/1000/60); 
	
	if(x <= 1){	StringExtention = "minute";}
	else { StringExtention = "minutes"; }
	x = x + " " + StringExtention;
    
    return x;
   
   }
   else if(DateDifference/1000/60/60 <= 24){
    
 var x =  Math.floor(DateDifference/1000/60/60); 
 
 	if(x <= 1){	StringExtention = "hr";}
	else { StringExtention = "hrs"; }
	x = x + " " + StringExtention;
 
  return x;
   
   }
    else if(DateDifference/1000/60/60/24 <= 30){
     
  var x =   Math.floor(DateDifference/1000/60/60/24); 
  	if(x <= 1){	StringExtention = "dy";}
	else { StringExtention = "dys"; }
	x = x + " " + StringExtention;
  
   return x;
   
   }
    else if(DateDifference/1000/60/60/24/30 <= 12){
     
  var x =   Math.floor(DateDifference/1000/60/60/24/30); 
  	if(x <= 1){	StringExtention = "mnth";}
	else { StringExtention = "mnths"; }
	x = x + " " + StringExtention;
   return x;
   
   }
   else if(DateDifference/1000/60/60/24/30/12 >= 1){
     
  var x =   Math.floor(DateDifference/1000/60/60/24/30/12); 
  	if(x <= 1){	StringExtention = "yr";}
	else { StringExtention = "yrs"; }
	x = x + " " + StringExtention;
   return x;
   
   }
	
    
	
	
}


function MonthToString(month){
	
  switch (month.toString()){
	  
	  case "0" : return "January"; 
	   case "1" : return "February"; 
	    case "2" : return "March"; 
		 case "3" : return "April"; 
		  case "4" : return "May"; 
		   case "5" : return "June"; 
		    case "6" : return "July"; 
			 case "7" : return "August"; 
			  case "8" : return "September"; 
			   case "9" : return "October"; 
			    case "10" : return "November"; 
				 case "11" : return "December"; 
	  
  }
	
	
}