var intVersion = "3.8";
var tabopen='false';
var tab2open='false';
var tab3open='false';
var activewindow="";
var openedLink;
var blnStartMax="false";
var mProgramLocation;
var skiploading=0;
var stwindowNo;
var frameAddress;
var mProgramLocation;
var mProgramIcon;
var mblncontrol;
var mProgramTitle;
var mStartMax;
var tableft=0;
var tab2left=0;
var tab3left=0;
var alreadymaxed=0;
var playSounds;
var screensaver;
var screensaverTime;
var loaded = 0;
var scrActive = "false";

function showHideLayer(layerName,showHide){
	frames[layerName].style.visibility=showHide;
}

function shutdownFade() {
	setTimeout("imgFade.src='../images/shade1.png'",500);
	setTimeout("imgFade.src='../images/shade2.png'",1000);
	setTimeout("imgFade.src='../images/shade3.png'",1500);
}

function deScr() {
	screensaverTime=icookies.document.getElementById('scrtime').value*2;
}

function ScrTimeout(){
	if(document.getElementById('boot').style.visibility=='hidden'&&document.getElementById('login').style.visibility=='hidden'&&document.getElementById('progwin').style.visibility=='hidden'&&document.getElementById('progwin2').style.visibility=='hidden'&&document.getElementById('progwin3').style.visibility=='hidden'&&document.getElementById('progMax').style.visibility=='hidden'){
		screensaverTime--;
		if(screensaverTime==0){
			setTitle(1,"Screen Saver","../apps/screensavers/" + icookies.document.getElementById('screensaver').value,"",11);
			deScr();
			scrActive="true";
		}
	}else{
		deScr();
	}
	autoClock();
}

function setTitle(blncontrol,ProgramTitle,ProgramLocation,ProgramIcon,StartMax){
	hideMenu();
	if(ProgramTitle=="PSPTunes"&&!(icookies.document.getElementById('chkPSPTunesTab').value=="false")){
		window.open(ProgramLocation);
		return;
	}
	if(blncontrol==10){
		window.open(ProgramLocation);
	}else{
		if(tab3open=='false'){
			document.getElementById('lT').innerHTML=ProgramTitle;
			document.getElementById('lTA').innerHTML=ProgramLocation;
			showHideLayer('loading','visible');

			skiploading=0;
			if(StartMax==0||StartMax==null){
				var tabspace1='false';
				var tabspace2='false';
				var tabspace3='false';

				if(frames['tab'].style.visibility=='visible'){
					tableft=frames['tab'].style.left;
				}else{
					tableft=0;
				}
				if(frames['tab2'].style.visibility=='visible'){
					tab2left=frames['tab2'].style.left;
				}else{
					tab2left=0;
				}
				if(frames['tab3'].style.visibility=='visible'){
					tab3left=frames['tab3'].style.left;
				}else{
					tab3left=0;
				}

				if((tableft=='84px'||tab2left=='84px'||tab3left=='84px')&&tabopen=='true'){
					tabspace1='false';
				}
				if(tabspace1=='false'&&(tableft=='180px'||tab2left=='180px'||tab3left=='180px')&&tab2open=='true'){
					tabspace2='false';
				}
				if(tabspace2=='false'&&(tableft=='281px'||tab2left=='281px'||tab3left=='281px')&&tab3open=='true'){
					tabspace3='false';
				}
				if(tabspace3=='false'&&(tableft=='276px'||tab2left=='276px'||tab3left=='276px')&&tab3open=='true'){
					tabspace3='false';
				}

				var emptytab = "";
				if(tabopen=='false'){
					emptytab="";
					tabopen='true';
				}else{
					if(tab2open=='false'){
						emptytab=2;
						tab2open='true';
					}else{
						if(tab3open=='false'){
							emptytab=3;
							tab3open='true';
						}
					}
				}
				if(tabspace1=='true'){frames['tab'+emptytab].style.left='84px';}
				if(tabspace2=='true'){frames['tab'+emptytab].style.left='180px';}
				if(tabspace3=='true'){frames['tab'+emptytab].style.left='276px';}
			}
			showWindow(emptytab,ProgramLocation,ProgramIcon,blncontrol,ProgramTitle,StartMax);
		}else{//Show 'Out of windows' dlg
			document.getElementById('mT').innerHTML=document.getElementById('tT').innerHTML;
			document.getElementById('mT2').innerHTML=document.getElementById('tT2').innerHTML;
			document.getElementById('mT3').innerHTML=document.getElementById('tT3').innerHTML;
			document.getElementById('mI').src=document.getElementById('tI').src;
			document.getElementById('mI2').src=document.getElementById('tI2').src;
			document.getElementById('mI3').src=document.getElementById('tI3').src;
			winMessage("No more windows","../images/icons/menu/run.png","");
			mProgramLocation=ProgramLocation;
			mProgramIcon=ProgramIcon;
			mblncontrol=blncontrol;
			mProgramTitle=ProgramTitle;
			mStartMax=StartMax;
			showHideLayer('loading','hidden');
			skiploading=1;
		}
	}
	deScr();
}

function showWindow(windowNo,ProgramLocation,ProgramIcon,blncontrol,ProgramTitle,StartMax){
	if(StartMax==0||StartMax==null){
		frames['progman'+windowNo].location.href=ProgramLocation;
		document.getElementById('aT'+windowNo).innerHTML=ProgramTitle;
		document.getElementById('tT'+windowNo).innerHTML=ProgramTitle.slice(0,14);
		document.getElementById('winicon'+windowNo).src=ProgramIcon;
		document.getElementById('tI'+windowNo).src=ProgramIcon;
		document.getElementById('imgTab'+windowNo).src='../images/window/tab_down.gif';
		activewindow=windowNo;
		if(!(windowNo=="")){windowMin("");}
		if(!(windowNo==2)){windowMin(2);}
		if(!(windowNo==3)){windowMin(3);}
		if(blncontrol>0) {
			 showHideLayer('winmax'+windowNo,'visible'); showHideLayer('winmin'+windowNo,'visible');
		}
		showHideLayer('tab'+windowNo,'visible'); showHideLayer('tabinfo'+windowNo,'visible'); showHideLayer('progwin'+windowNo,'visible'); showHideLayer('winexit'+windowNo,'visible'); showHideLayer('programs'+windowNo,'visible');
		blnStartMax="false";
	}
	if(StartMax==1){
		if(SkipMaxMsg==0){
			mProgramLocation=ProgramLocation;
			alreadymaxed=0;
			setTimeout("if(alreadymaxed=0){iprogMax.location.href=mProgramLocation;}",2500);
		}else{
			iprogMax.location.href=mProgramLocation;
		}
		showHideLayer('progMax','visible');
		blnStartMax="true";
	}

	if(StartMax==11){
		iprogMax.location.href=ProgramLocation;
		showHideLayer('progMax','visible');
		blnStartMax="true";
	}

	if(StartMax==10){
		window.open(ProgramLocation);
	}

	showHideLayer('loading','hidden');
	document.getElementById('lT').innerHTML="";

	document.getElementById('lTA').innerHTML="";
}

function theClock(){ 
if (!document.all&&!document.getElementById) 
return 
thelement=document.getElementById? document.getElementById("tP"): document.all.tP 
var Digital=new Date() 
var hours=Digital.getHours() 
var minutes=Digital.getMinutes() 
var dn="PM" 
if (hours<12) 
dn="AM" 
if (hours>12) 
hours=hours-12 
if (hours==0) 
hours=12 
if (minutes<=9) 
minutes="0"+minutes 
var ctime=hours+":"+minutes+" "+dn 
thelement.innerHTML=""+ctime+"" 
} 
window.onload=theClock 


function hideMenu(){showHideLayer('normalMenu','hidden');showHideLayer('classicMenu','hidden');showHideLayer('muser','hidden'); showHideLayer('mlinks','hidden');showHideLayer('mpspwindowsvista','hidden');showHideLayer('mportals','hidden'); showHideLayer('mgames','hidden');showHideLayer('mprograms','hidden');showHideLayer('mapps','hidden');showHideLayer('mfavapps','hidden');showHideLayer('startoff','visible');deScr();
}

function openTab(windowNo){
	 showHideLayer('normalMenu','hidden');showHideLayer('classicMenu','hidden');showHideLayer('mapps','hidden'); showHideLayer('progwin'+windowNo,'visible'); showHideLayer('winexit'+windowNo,'visible'); showHideLayer('programs'+windowNo,'visible'); showHideLayer('winmax'+windowNo,'visible'); showHideLayer('winmin'+windowNo,'visible');
	document.getElementById('imgTab'+windowNo).src='../images/window/tab_down.gif';
	if(!(windowNo=="")){windowMin("");}
	if(!(windowNo==2)){windowMin(2);}
	if(!(windowNo==3)){windowMin(3);}
}

function windowExit(windowNo){
	hideMenu();
	if(windowNo==''){
		closeWindow('');
		tabopen='false';
		if(tab2open=='true'){
			if(tab3open=='true'){
				copyWindow(3,2);
			}
			copyWindow(2,'');
		}else{
			if(tab3open=='true' && frames['tab3'].style.left=='180px'){
				frames['tab3'].style.left='84px';
			}
		}
	}

	if(windowNo==2){
		closeWindow(2);
		tab2open='false';
		if(tab3open=='true'){
			copyWindow(3,2);
		}
	}

	if(windowNo==3){
		closeWindow(3);
		tab3open='false';
	}
}

function copyWindow(sSource,Destination){
	var sourceTab='tab'+sSource;
	var destinationTab='tab'+Destination;
	frames[sourceTab].style.left=frames[destinationTab].style.left;
}

function closeWindow(windowNo){
	frames['progman'+windowNo].location.href='blank.htm';
	showHideLayer('progwin'+windowNo,'hidden');showHideLayer('winmin'+windowNo,'hidden');showHideLayer('winmax'+windowNo,'hidden'); showHideLayer('winexit'+windowNo,'hidden'); showHideLayer('programs'+windowNo,'hidden'); showHideLayer('tab'+windowNo,'hidden'); showHideLayer('tabinfo'+windowNo,'hidden');
	if(windowNo==''){var intLeft='84px';}
	if(windowNo==2){var intLeft='180px';}
	if(windowNo==3){var intLeft='276px';}
	frames['tab'+windowNo].style.left=intLeft;
}

function windowMin(windowNo){
	 showHideLayer('progwin'+windowNo,'hidden'); showHideLayer('winexit'+windowNo,'hidden'); showHideLayer('programs'+windowNo,'hidden'); showHideLayer('winmax'+windowNo,'hidden'); showHideLayer('winmin'+windowNo,'hidden');
	 document.getElementById('imgTab'+windowNo).src='../images/window/tab.gif';
}

function windowMax(windowNo){
	stwindowNo=windowNo;
	setTimeout("windowMaxNow(frames['progman'+stwindowNo].location.href)",2500);
	showHideLayer('progMax','visible');
	windowMin(windowNo);
	activewindow=windowNo;
}

function restoreWindow() {
	if(blnStartMax=="false"){
		openTab(activewindow);
	}
	if(scrActive=="true"){
		if(icookies.document.getElementById('scrPass').value=="true"){
			hideMenu();
			showHideLayer('txtPassword','visible');
			showHideLayer('portalmenu','visible');
			showHideLayer('lyShutdown','hidden');
			showHideLayer('lyShutdowndlg','hidden');
			showHideLayer('login','visible');
		}
		scrActive="false";
	}
	if(frames['progMax'].style.visibility=="visible"){
		showHideLayer('progMax','hidden');
		frames['iprogMax'].location.href="../apps/appsmax.htm";
	}
}