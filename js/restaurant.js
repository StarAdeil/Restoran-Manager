
function CreateTable(client,count,name){
	this["Клиент"] = client;//Количество клиентов
	this["Номер"] = name;//Номер стола оно и имя
	/********************************/
	/*Создаем Стол  количесвто зависит от count имя от name размер стола от client*/
	/********************************/
	this.table = function (){
		let num = Math.ceil(this.Клиент/2);//Размер стола зависит от количества человек 
		let str = "";
		for(let i = 0 ; i < count ; i++){//Цыкл повторяеться по количеству столов COUNT !! 
			 let tableNam = this.Номер++;
			 str +=`<div class='tablebox'><span>${tableNam}</span>`;
			 let numberPlace = 1;
             for(let k = 0 ; k < num ; k++){// Цыкл повторяеться по количеству мест
             	 str +="<div class='nextTable'>"; 
             	 str += `<div class="client free" data-table='${tableNam}' data-number-place='${numberPlace++}'></div><div class='table'  style='width:150px;height:100px;background-image:url(img/bgtable.jpg);border-radius:5px'></div><div class="client free" data-table='${tableNam}' data-number-place='${numberPlace++}'></div>`;
             	 str +="</div>";
             }
			 str +="</div>"; 
		} 
		return str;//Вывод результата
	}
	/********************************/
	/*Функнция органайзер переменных*/
	/********************************/
	function letList(){
		let arr = {
			//МЕСТО ЗА СТОЛОМ 
			clients : document.querySelectorAll(".client"), // Любое место (клиент)
			freePlace : document.querySelectorAll('.free'),//Свободные Места
			checkPlace : document.querySelectorAll('.check'),//Оформление заказа(Чек)
			takePlace : document.querySelectorAll('.take'), //Бронь места
			completeClients : document.querySelectorAll('.Completed'), // Заказ оформлен
			//КНОПКИ 
			takePlaceButton : document.getElementById("takePlace"), // Занять место
			freePlaceButton : document.getElementById("freePlace"), // Освободить место
			checkButton : document.getElementById("check"),//Выбираем клиентов для заказа
			orderButton : document.getElementById("creatOrder"),//Создаем заказ
			result : document.getElementById("result")//Результат
		}
		return arr;
	}
	/********************************/
	/*Функнция выводит общую информацию  о занятых местах и свободных а так же количество столов*/
	/********************************/
	function info(){
		let countTable = document.querySelectorAll('.tablebox');
		document.getElementById("result").innerHTML = "Свободный мест :"+letList().freePlace.length+"<br>Занятых мест :"+(letList().checkPlace.length+letList().takePlace.length+letList().completeClients.length)+"<br>Количество столов :"+countTable.length;
	}
	/********************************/
	/*Создаем кнопки*/
	/********************************/
	this.actionButton = function(){
		let str = "<br><button id='takePlace'>Занять место</button>";
		str +="<br><button id='freePlace'>Освободить место</button>";
		str +="<br><button id='check'>Выбрать место для заказа</button>";
		str += "<br><button id='creatOrder'>Создать заказ</button>";
		info();
		return str;
	}
	/********************************/
	/*Бронируем и занимаем места*/
	/********************************/
	this.actionTakePlace = function(){
		letList().takePlaceButton.onclick = function (){
			letList().clients.forEach(function(elem){
				elem.onclick = function(){
					elem.style.backgroundColor = "red";
					elem.setAttribute("class","client take");
					info();
				};
			});
		};
	};
	/********************************/
	/*Освобождаем места*/
	/********************************/
	this.actionFreePlace = function(){
		letList().freePlaceButton.onclick = function (){
			letList().clients.forEach(function(elem){
				elem.onclick = function(){
					elem.style.backgroundColor = "green";
					elem.removeAttribute("data-client");
					elem.setAttribute("class","client free");
					elem.innerHTML = " ";
					info();
				}
			});
		}
	}
	/********************************/
	/*Выбираем клиентов на заказ*/
	/********************************/
	this.check = function(){
		letList().checkButton.onclick = function (){
			letList().clients.forEach(function(elem){
				elem.onclick = function(){
					elem.style.backgroundColor = "yellow";
					elem.setAttribute("class","client check");
					info();
				}
			});
		};
	};
	/********************************/
	/*Создание заказа и информации о заказе так же помечаем клиента*/
	/********************************/
	this.creatOrder = function(){
		letList().orderButton.onclick = function (){
			let orderInfo = document.getElementById("orderInfo");
			let tableInfo ="";
			let orderList = document.querySelectorAll('.orderList');
			let orderCount = orderList.length+1;
			if(letList().checkPlace.length > 0){
				orderInfo.innerHTML += `<li class='orderList'>Номер заказа :${orderCount} <label for="orderStatus">Статус заказа :<label><select name='orderStatus'><option value="expected">Ожидаеться</option><option value="complete">Выполнен</option><option value="canceled">Отменен</option></select><button class="details">Подробнее</button><button class="menu">Меню</button><div class="moreInfo">количество человек : ${letList().checkPlace.length}  ${placeOrder()} </div>${menu(orderCount,menuArr())}</li>`;		
				moreInfo();
				seeMenu();
				menuElemCount();
				resetCount();
				letList().checkPlace.forEach(function(elem){
					elem.style.backgroundColor = "#8b00ff";
					elem.setAttribute("data-client",letList().checkPlace.length);
					elem.innerHTML = orderCount;
					elem.setAttribute("class","client Completed");
				});
			}	
		}
	}
	/********************************/
	/*Стол где зделали заказ*/
	/********************************/
	function tableOrder (){
		let arr = [];
		letList().checkPlace.forEach(function(elem){
			arr.push(elem.getAttribute('data-table'));
		});
		let set1 = new Set(arr);
		let arr2 = [...set1];
		return arr2;
	}
	/********************************/
	/*Место клиентов по заказам + на каком столе сделан заказ*/
	/********************************/
	function placeOrder(){
		let arr = tableOrder();
		let str = '';
		for(let i = 0 ; i < arr.length ; i++){ //Находим столы в которых сделали заказ по атрибуту
			let elem = document.querySelectorAll(`.check[data-table='${arr[i]}']`);
			str +="<br>Стол "+elem[0].getAttribute('data-table')+"<br>Место:";
			for(let k = 0; k < elem.length ; k++){//Берем места клиентов со стола на котором сделали заказ
				str +=elem[k].getAttribute('data-number-place')+",";
			}
		}
		return str;
	}
	/********************************/
	/*Кнопка подробнее о заказе*/
	/********************************/
	function moreInfo(){
		let button = document.querySelectorAll('.details');
		let divMore = document.querySelectorAll('.moreInfo');
		for(let i = 0; i < button.length;i++){
			button[i].onclick = function(){
				divMore[i].style.display = "block";
				divMore[i].setAttribute('class','hideInfo');
				button[i].innerHTML = "Скрыть";
				button[i].setAttribute('class','hide');
				hideInfo();
			}
		}
	}
	/********************************/
	/*Кнопка подробнее ,скрыть информацию об заказе*/
	/********************************/
	function hideInfo(){
		let hide = document.querySelectorAll(".hide");
		let hideInfo = document.querySelectorAll(".hideInfo");
		for(let i = 0 ; i < hide.length ; i++){
			hide[i].onclick = function(){
				hideInfo[i].style.display = "none";
				hideInfo[i].setAttribute("class","moreInfo");
				hide[i].setAttribute('class',"details");
				hide[i].innerHTML = "Подробнее";
				moreInfo();
			}
		}
	}
	/********************************/
	/*Создаем лист меню в заказе из массива меню*/
	/********************************/
	function menu(num,arr){
		let str = '<ul class="menuList">';
		arr.forEach(function(elem){
			str += `<li class="menuElemFree"  data-name='elemMenu' data-sum='${elem.price}' data-sum-memory='${elem.price}' data-number-order='${num}'>${elem.name} - ${elem.price} грн </li><button class="menuElemCount">1</button><button class="сountReset">Сбросить</button>`;
		});
			str += '<div class="sumResult"></div></ul>';
		return str;
	}
	/********************************/
	/*Раскрываем меню заказа при нажатии кнопки*/
	/********************************/
	function seeMenu(){
		let menuButton = document.querySelectorAll(".menu");
		let menuList = document.querySelectorAll('.menuList');
		for(let i = 0 ; i < menuButton.length ; i++){
			menuButton[i].onclick = function(){
				menuList[i].style.display = "block";
				menuButton[i].innerHTML = "Скрыть меню";
				menuButton[i].setAttribute('class','hideMenuButton');
				menuList[i].setAttribute('class','hideMenuList');
				hideMenu();
				menuElemCheck();
			}
		}
		
	}
	/********************************/
	/*Скрываем меню заказа при нажатии кнопки*/
	/********************************/
	function hideMenu(){
		let menuButton = document.querySelectorAll('.hideMenuButton');
		let menuList = document.querySelectorAll('.hideMenuList');
		for(let i = 0 ; i < menuButton.length ; i++){
			menuButton[i].onclick = function(){
				menuList[i].style.display = "none";
				menuButton[i].innerHTML = "Меню";
				menuButton[i].setAttribute('class','menu');
				menuList[i].setAttribute('class','menuList');
				seeMenu();
			}
		}
	}
	/********************************/
	/*Выбираем елементы меню и формируем цену*/
	/********************************/
	function menuElemCheck(){
		let menuElem = document.getElementsByClassName("menuElemFree");
		let menuResult = document.querySelectorAll(".sumResult");
		let metka = "";
			for(let i = 0 ; i < menuElem.length ; i++){
				menuElem[i].onclick = function(){
					menuElem[i].style.color = "green";
					menuElem[i].setAttribute("class","menuElemCheck");
					metka = menuElem[i].getAttribute('data-number-order');
					menuResult[metka-1].innerHTML = sum(menuElem[i]);
				menuElemFree();
				};
				
			};
			
	};
	/********************************/
	/*Убираем выделение с елементов меню*/
	/********************************/
	function menuElemFree(){
		let menuElem = document.querySelectorAll('.menuElemCheck');
		let menuResult = document.querySelectorAll(".sumResult");
		let metka = "";
		for(let i = 0; i < menuElem.length ; i++){
			menuElem[i].onclick = function(){
				menuElem[i].style.color = "red";
				menuElem[i].setAttribute("class","menuElemFree");
				metka = menuElem[i].getAttribute('data-number-order');
				menuResult[metka-1].innerHTML = sum(menuElem[i]);
				
			menuElemCheck();
			};
			
		};
		
	}
	/********************************/
	/*Cумма по выдиленным елементам меню*/
	/********************************/
	function sum(elem){
		let check = elem.getAttribute("data-number-order");
		let menuElem = document.querySelectorAll(`.menuElemCheck[data-number-order='${check}']`);
		let str = 0;
		for(let i = 0 ; i < menuElem.length ; i++){
			str += Number(menuElem[i].getAttribute("data-sum"));
		}
		return str;
	}
	/********************************/
	/*Изменить количество выбранных блюд и поднятие цены в зависимости от количества*/
	/********************************/
	function menuElemCount(){
		let menuElemCount = document.querySelectorAll(".menuElemCount");
		let li  = document.querySelectorAll("[data-name='elemMenu']");
		let menuResult = document.querySelectorAll(".sumResult");
		let memory = "";
		for(let i = 0 ; i < menuElemCount.length ; i++){
			menuElemCount[i].onclick = function(){
				menuElemCount[i].innerHTML = Number(menuElemCount[i].innerHTML)+1;
				memory = li[i].getAttribute("data-sum");
				li[i].setAttribute("data-sum",Number(menuElemCount[i].innerHTML)*(Number(memory)/(Number(menuElemCount[i].innerHTML)-1)));
				metka = li[i].getAttribute('data-number-order');
				if(li[i].getAttribute("class") == 'menuElemCheck'){
					menuResult[metka-1].innerHTML = sum(li[i]);
				}
			}
		}
	}
	/********************************/
	/*Сбросить количество*/
	/********************************/
	function resetCount(){
		let сountReset = document.querySelectorAll(".сountReset");
		let menuElemCount = document.querySelectorAll(".menuElemCount");
		let li  = document.querySelectorAll("[data-name='elemMenu']");
		let menuResult = document.querySelectorAll(".sumResult");
		for(let i = 0 ; i < сountReset.length ; i++){
			сountReset[i].onclick = function(){
				menuElemCount[i].innerHTML = "1";
				let memory = li[i].getAttribute('data-sum-memory');
				li[i].setAttribute('data-sum',memory);
				metka = li[i].getAttribute('data-number-order');
				menuResult[metka-1].innerHTML = sum(li[i]);
			}
		}
	}
	/********************************/
	/*Меню блюд*/
	/********************************/
	function menuArr(){
		let arr = [
			{
				name:"Картошка Фри",
				price:50
			},
			{
				name:"Салат Цезарь",
				price:150
			},
			{
				name:"Картошка с Мясом",
				price:350
			},
			{
				name:"Пицца",
				price:200
			},
			{
				name:"Пиво Дюнкель 0.5",
				price:20
			},
			{
				name:"Пиво Бланш 0.5",
				price:30
			},
		];
		return arr;
	}
}
let wrapper = document.getElementById("wrapper");
let createTable = new CreateTable(6,3,1);
let createTableT = new CreateTable(4,3,4);
let createTableX = new CreateTable(2,3,7);
wrapper.innerHTML += createTable.table()+createTableT.table()+createTableX.table();
document.getElementById("buttons").innerHTML += createTable.actionButton();
createTable.actionTakePlace();
createTable.actionFreePlace();
createTable.check();
createTable.creatOrder();
