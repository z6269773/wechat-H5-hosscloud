$(document).ready(function() {
	
//		var dispatchNo=window.location.href.split("?")[1].split("&")[1].split("=")[1]
//		var dispatchId=window.location.href.split("?")[1].split("&")[0].split("=")[1]
//		var types=window.location.href.split("?")[1].split("&")[2].split("=")[1]
		
		var dispatchId = localStorage.getItem('iid')
		var types = localStorage.getItem('types')
		var dispatchNo = localStorage.getItem('dispatchNo')
		
		$("#equipment").click(function() {
			$(".contentt").show()
		})
		
		$("#materials").click(function() {
			$(".contentt2").show()
		})
		
		$("#project").click(function() {
			$(".contentt0").show()
		})
		

//		$(".contentt0").on("touchmove",function(e) {
//			$("#boxs").css("overflow","hidden")
//      });
//		$(".contentt0").on("touchend",function(e) {
//			$("#boxs").css("overflow","auto")
//      });
//      
//		$(".contentt").on("touchstart",function(e) {
//			$("#boxs").css("overflow","hidden")
//			$("#boxs").css("height","100%")
//      });
//		$(".contentt").on("touchend",function(e) {
//			$("#boxs").css("overflow","auto")
//			$("#boxs").css("height","auto")
//      });
//     
//     
//     	$(".contentt2").on("touchmove",function(e) {
//			$("#boxs").css("overflow","hidden")
//      });
//		$(".contentt2").on("touchend",function(e) {
//			$("#boxs").css("overflow","auto")
//      });
		
		
		
		
		
		function repiarType() {
			$.ajax({
				url: ias.api.repiarType
				,contentType : "application/json"
	            ,dataType : "json"
				,method:"post"
				,success:function(data) {
					if(data.status == 200) {
//						console.log(data.results);
						var list=""
						if (data && data.results) {
							for(var i in data.results){
								if (i == 1) {
									list+='<span class="ufr color border1 repiarType" index="'+i+'">'+data.results[i]+'</span>'
								} else {
									list+='<span class="ufr border2 repiarType" index="'+i+'">'+data.results[i]+'</span>'
								}
							}
						}
						$(".connn").append(list)
					} else {
						alert(data.message);
					}
				}
			});
		}
		repiarType()
		//按钮选项
		$(".connn").on("click","span.ufr",function() {
			$(this).parents(".connn").find("span.ufr").removeClass("color border1 border2").addClass("border2")
			$(this).removeClass("border2").addClass("color border1")
		})
		
		
		//音视频等功能
		$("#img1").click(function() {
			alert("语音")
		})
		$("#img2").click(function() {
			alert("拍照")
		})
		$("#img3").click(function() {
			alert("照片")
		})
		$("#img4").click(function() {
			alert("视频")
		})
		
		//删除上传文件
		$(".cont_remove").on("click",".img2_remove",function() {
			$(this).parent().remove()
		})
		
		
		
		//设备页面数据
		var data_building
		function building() {
			$.ajax({
				url: ias.api.serviceLocation
				,contentType : "application/json"
	            ,dataType : "json"
				,method:"post"
				,success:function(data) {
					if(data.status == 200) {
//						console.log(data.results);
						if (data.results.length>0) {
							data_building=data.results
							var list=""
							$(data.results).each(function(i,e) {
								list+='<div class="clearfix ulev-3 con uinn" iid="'+e.id+'" type="'+e.type+'">'
										+'<span class="ufl">'+e.text+'</span>'
										+'<span class="ufr"><img src="../../../static/images/icon_back_b.png"/></span>'
									+'</div>'
							})
							$(".contentt .box").eq(0).children(".content").html(list)
						}
					} else {
						alert(data.message);
					}
				}
			});
		}
		building()
		
		//设备页面点击下一层
		var data_floor,data_room
		$(".contentt .box").on("click",".con",function() {
			var index=$(this).parents(".box").index()
			var type=$(this).attr("type")
			var iid=$(this).attr("iid")
			if (index != 3) {
				switch(type){
					case "building":	
						data_floor_room(iid,1)
						break;
					case "floor":
						data_floor_room(iid,2)
						break;
					case "room":
						shebei(iid)
						break;
				}
				
				$(".contentt .box").addClass("display_none")
				$(".contentt .box").eq(index+1).removeClass("display_none")
				
			}
		})
		
		function data_floor_room(iid,index) {
			switch(index){
				case 1:	
					$(data_building).each(function(i,e) {
						if (e.id == iid) {
							data_floor=e.nodes
						}
					})
					if (data_floor.length>0) {
						var list=""
						$(data_floor).each(function(i,e) {
							list+='<div class="clearfix ulev-3 con uinn" iid="'+e.id+'" type="'+e.type+'">'
										+'<span class="ufl">'+e.text+'</span>'
										+'<span class="ufr"><img src="../../../static/images/icon_back_b.png"/></span>'
									+'</div>'
						})
						$(".contentt .box").eq(index).children(".content").html(list)
					}
					break;
				case 2:
					$(data_floor).each(function(i,e) {
						if (e.id == iid) {
							data_room=e.nodes
						}
					})
					if (data_room.length>0) {
						var list=""
						$(data_room).each(function(i,e) {
							list+='<div class="clearfix ulev-3 con uinn" iid="'+e.id+'" type="'+e.type+'">'
										+'<span class="ufl">'+e.text+'</span>'
										+'<span class="ufr"><img src="../../../static/images/icon_back_b.png"/></span>'
									+'</div>'
						})
						$(".contentt .box").eq(index).children(".content").html(list)
					}
					break;
			}
			
		}
		function shebei(iid) {
			$.ajax({
				url: ias.api.equipList
				,contentType : "application/json"
	            ,dataType : "json"
				,method:"post"
				,data: JSON.stringify({
					"id":iid
				}).encode()
				,success:function(data) {
					if(data.status == 200) {
//						console.log(data.results);
						if (data.results.length>0) {
							var list=""
							$(data.results).each(function(i,e) {
								list+='<div class="clearfix ulev-3 con uinn con22" iid="'+e.id+'">'
										+'<span class="ufl con22_img"><img src="../../../static/images/icon_dh_l.png"/></span>'
										+'<span class="ufl">'+e.name+'</span>'
									+'</div>'
							})
							$(".contentt .box").eq(3).children(".content").html(list)
						}
					} else {
						alert(data.message);
					}
				}
			});
		}
		
		//设备页面点击选中设备
		$(".contentt").on("click",".con22",function() {
			$(".contentt .con22 span>img").css("display","none")
			$(this).find("span>img").css("display","block")
		})
		//设备页面提交设备
		$(".contentt .sub_btn").click(function() {
//			console.log(build,floor,room)
			var equip=""
			var idd=""
			$($(".contentt .con22")).each(function() {
				if ($(this).find("span>img").css("display") == "block") {
					equip=$(this).children().eq(1).text()
					idd=$(this).attr("iid")
//					console.log($(this).children().eq(1).text())
				}
			})
			$("#equipment").text(equip).attr("idd",idd)
			$(".contentt").hide()
			$(".contentt .box").addClass("display_none")
			$(".contentt .box").eq(0).removeClass("display_none")
		})
		//设备页面取消
		$(".contentt .btn_solve").click(function() {
			$(".contentt").hide()
			$(".contentt .box").addClass("display_none")
			$(".contentt .box").eq(0).removeClass("display_none")
		})
		
		
		
		
		
		
		
		//物料页面维修用料列表列表
		function PGlist() {
			$.ajax({
				url: ias.api.materialsList
				,contentType : "application/json"
	            ,dataType : "json"
				,method:"post"
				,data: JSON.stringify({
					"dispatchId":dispatchId
				}).encode()
				,success:function(data) {
					if(data.status == 200) {
//						console.log(data.results);
						if (data.results.length>0) {
							var list=""
							var sum=0
							$(data.results).each(function(i,e) {
								sum=accAdd(e.moneny,sum)
								list+='<p class="bg-eee jiange"></p>'
									+'<div class="content2">'
										+'<div class="cont3 clearfix ulev-3">'
											+'<span class="ufl">领料单号</span>'
											+'<span class="ufr color-aaa cutText-2">'+e.voucherNo+'</span>'
										+'</div>'
										+'<div class="cont3 clearfix ulev-3">'
											+'<span class="ufl">物料名称</span>'
											+'<span class="ufr color-aaa cutText-2">'+e.name+'</span>'
										+'</div>'
										+'<div class="cont3 clearfix ulev-3">'
											+'<span class="ufl">物料品牌</span>'
											+'<span class="ufr color-aaa cutText-2">'+e.brand+'</span>'
										+'</div>'
										+'<div class="cont3 clearfix ulev-3">'
											+'<span class="ufl">规格型号</span>'
											+'<span class="ufr color-aaa cutText-2">'+e.model+'</span>'
										+'</div>'
										+'<div class="cont3 clearfix ulev-3">'
											+'<span class="ufl">物料数量</span>'
											+'<span class="ufr color-aaa cutText-2">'+e.qty+'</span>'
										+'</div>'
										+'<div class="cont3 clearfix ulev-3">'
											+'<span class="ufl">物料金额</span>'
											+'<span class="ufr color-aaa cutText-2">'+e.moneny+'</span>'
										+'</div>'
									+'</div>'
							})
							var img=$("#materials *").not("b")[0]
							$("#materials").html(sum+"元").append(img)
							$(".contentt21").html(list)
						}
					} else {
						alert(data.message);
					}
				}
			});
		}
		PGlist()
		
		//物料页面仓库数据
		function materialsList() {
			$.ajax({
				url: ias.api.materialsHouse
				,contentType : "application/json"
	            ,dataType : "json"
				,method:"post"
				,success:function(data) {
					if(data.status == 200) {
//						console.log(data.results);
						if (data.results.length>0) {
							var list=""
							$(data.results).each(function(i,e) {
								list+='<div class="clearfix ulev-3 con uinn content01" iid="'+e.id+'">'
										+'<span class="ufl">'+e.name+'</span>'
										+'<span class="ufr"><img src="../../../static/images/icon_back_b.png"/></span>'
									+'</div>'
							})
							$(".content010 .content001").html(list)
						}
					} else {
						alert(data.message);
					}
				}
			});
		}
		materialsList()
		
		//物料页面添加按钮
		$("#btn1").click(function() {
			$(".contentt2 .content010").show()
//			$(".content11").html("")
		})
		//点击仓库
		var wearhouse=""
		$(".content010 .content001").on("click",".con",function() {
			wearhouse=$(this).attr("iid")
			$(".contentt2 .content011").show()
		})
		
		//物料页面完成按钮
		$(".btn1_remove").click(function() {
			var sum=0
			$($(".contentt21 .content2")).each(function() {
				sum=accAdd($(this).children(".cont3:last-child").children("span:last-child").text().split("元")[0],sum)
			})
			var img=$("#materials *").not("b")[0]
			$("#materials").html(sum+"元").append(img)
			$(".contentt2").hide()
		})
		
		//input输入货位名称
		$('.content011 .search input').on('input propertychange', function() {
			var value=$(this).val()
			var checks=check()
			if (checks) {
				$.ajax({
					url: ias.api.materialsQuery
					,contentType : "application/json"
		            ,dataType : "json"
					,method:"post"
					,data: JSON.stringify({
						"value":value
						,"wearhouse":wearhouse
					}).encode()
					,success:function(data) {
						if(data.status == 200) {
//							console.log(data.results);
							if (data.results.length>0) {
								var list=""
								$(data.results).each(function(i,e) {
									list+='<div class="clearfix ulev-3 con uinn content01" name="'+e.materials.name+'" brand="'+e.materials.brand+'" model="'+e.materials.model+'" avgPrice="'+e.materials.avgPrice+'" whName="'+e.whName+'" qty="'+e.qty+'" materialId="'+e.materialId+'" idd="'+e.whCode+'" >'
											+'<span class="ufl">'+e.materials.name+'</span>'
											+'<span class="ufr"><img src="../../../static/images/icon_back_b.png"/></span>'
										+'</div>'
								})
								$(".content011 .content001").html(list)
							}
						} else {
							alert(data.message);
						}
					}
				});
			}
		});
		var oldTime=0;
		function check(){
		    var now=new Date().getTime();
		    var flag=0;
		    if(now-oldTime>1000)
		    	flag=1
		    oldTime=now
		    return flag;
		}
		//点击物资
		var materialid,materialidd
		$(".content011 .content001").on("click",".con",function() {
			$(".contentt2 .content1 .cont3 span:last-child").eq(0).text($(this).attr("name"))
			$(".contentt2 .content1 .cont3 span:last-child").eq(1).text($(this).attr("brand"))
			$(".contentt2 .content1 .cont3 span:last-child").eq(2).text($(this).attr("model"))
			$(".contentt2 .content1 .cont3 span:last-child").eq(3).text($(this).attr("avgPrice"))
			$(".contentt2 .content1 .cont3 span:last-child").eq(4).text($(this).attr("whName"))
			$(".contentt2 .content1 .cont3 span:last-child").eq(5).text($(this).attr("qty"))
			$(".contentt2 .content1 .cont3 span:last-child").eq(7).text($(this).attr("avgPrice")+"元")
			materialid=$(this).attr("materialid")
			materialidd=$(this).attr("idd")
			$(".contentt2 .content1").show()
		})
		
		//物料页面添加按钮
		$("#btn2").click(function() {
			$(".contentt2 .content010").hide()
			$(".contentt2 .content011").hide()
			$(".contentt2 .content1").hide()
//			console.log(materialid,materialidd,dispatchNo,$(".contentt2 .number").text())
			$.ajax({
				url: ias.api.materialSubmit
				,contentType : "application/json"
	            ,dataType : "json"
				,method:"post"
				,data: JSON.stringify({
					"materialId": materialid
					 ,"whId":materialidd
					,"dispatchNo":dispatchNo
					,"qty":$(".contentt2 .number").text()
				}).encode()
				,success:function(data) {
					if(data.status == 200) {
//						alert("成功");
						PGlist()
					} else {
						alert(data.message);
					}
				}
			});
			
			
//			var list='<p class="bg-eee jiange"></p>'
//				+'<div class="content2">'
//					+'<div class="cont3 clearfix ulev-3">'
//						+'<span class="ufl">名称</span>'
//						+'<span class="ufr color-aaa cutText-2">'+$(".contentt2 .content1 .name").text()+'</span>'
//					+'</div>'
//					+'<div class="cont3 clearfix ulev-3">'
//						+'<span class="ufl">品牌</span>'
//						+'<span class="ufr color-aaa cutText-2">'+$(".contentt2 .content1 .brand").text()+'</span>'
//					+'</div>'
//					+'<div class="cont3 clearfix ulev-3">'
//						+'<span class="ufl">规格</span>'
//						+'<span class="ufr color-aaa cutText-2">'+$(".contentt2 .content1 .model").text()+'</span>'
//					+'</div>'
//					+'<div class="cont3 clearfix ulev-3">'
//						+'<span class="ufl">单价</span>'
//						+'<span class="ufr color-aaa cutText-2">'+$(".contentt2 .content1 .avgPrice").text()+'</span>'
//					+'</div>'
//					+'<div class="cont3 clearfix ulev-3">'
//						+'<span class="ufl">仓库</span>'
//						+'<span class="ufr color-aaa cutText-2">'+$(".contentt2 .content1 .whName").text()+'</span>'
//					+'</div>'
//					+'<div class="cont3 clearfix ulev-3">'
//						+'<span class="ufl">库存</span>'
//						+'<span class="ufr color-aaa cutText-2">'+$(".contentt2 .content1 .qty").text()+'</span>'
//					+'</div>'
//					+'<div class="cont3 clearfix ulev-3">'
//						+'<span class="ufl">物料数量</span>'
//						+'<span class="ufr color-aaa cutText-2">'+$(".contentt2 .content1 .number").text()+'</span>'
//					+'</div>'
//					+'<div class="cont3 clearfix ulev-3">'
//						+'<span class="ufl">物料金额</span>'
//						+'<span class="ufr color-aaa cutText-2">'+$(".contentt2 .content1 .sum").text()+'</span>'
//					+'</div>'
//				+'</div>'
//				
//			$(".contentt2 .content").append(list)
			
		})
		
		//物料页面加减按钮
		var price=0
		$(".contentt2 .content2").on("click",".jia",function() {
			price=$(".contentt2 .content1 .cont3 span:last-child").eq(3).text()
			var value=$(".contentt2 .number").text()
			value++
			$(".contentt2 .number").text(value)
			$(".contentt2 .sum").text(accMul(Number(price), Number(value))+"元")
			$(".contentt2 .jian img").attr("src","../../../static/images/icon_jianhao.png")
		})
		$(".contentt2 .content2").on("click",".jian",function() {
			price=$(".contentt2 .content1 .cont3 span:last-child").eq(3).text()
			var value=$(".contentt2 .number").text()
			value--
			if (value > 1) {
				$(".contentt2 .number").text(value)
				$(".contentt2 .sum").text(price*value+"元")
			}else {
				$(".contentt2 .number").text(1)
				$(".contentt2 .sum").text(price*1+"元")
				$(".contentt2 .jian img").attr("src","../../../static/images/icon_jianhao_jinzi.png")
			}
		})
		
		
		
		
		
		//项目页面数据
		var data_repairProject
		function repairProject() {
			$.ajax({
				url:ias.api.repairProject
				,contentType : "application/json"
	            ,dataType : "json"
				,method:"post"
				,success:function(data) {
					if(data.status == 200) {
//						console.log(data.results);
						var list=""
						if (data.results.length>0) {
							data_repairProject=data.results
							$(data.results).each(function(i,e) {
								list+='<div class="clearfix ulev-3 con uinn" value="'+e.value+'">'
										+'<span class="ufl">'+e.text+'</span>'
										+'<span class="ufr"><img src="../../../static/images/icon_back_b.png"/></span>'
									+'</div>'
							})
							$(".contentt0 .box").eq(0).children(".content").html(list)
						}
					} else {
						alert(data.message);
					}
				}
			});
		}
		repairProject()
		//项目页面点击下一层
		var str1
		$(".contentt0").on("click",".box .con",function() {
			var index=$(this).parents(".box").index()
			var value=$(this).attr("value")
			var list=""
			if (index != 1) {
				$(data_repairProject).each(function(x,y) {
					if (y.value == value) {
						$(y.nodes).each(function(i,e) {
							list+='<div class="clearfix ulev-3 con uinn con22" value="'+e.value+'">'
									+'<span class="ufl con22_img"><img src="../../../static/images/icon_dh_l.png"/></span>'
									+'<span class="ufl">'+e.text+'</span>'
								+'</div>'
						})
					}
				})
				$(".contentt0 .box").eq(1).children(".content").html(list)
				
				str1=$(this).children("span:first-child").text()
				$(".contentt0 .box").addClass("display_none")
				$(".contentt0 .box").eq(index+1).removeClass("display_none")
			}
		})
		//项目页面点击选中设备
		$(".contentt0").on("click",".con22",function() {
			$(".contentt0 .con22 span>img").css("display","none")
			$(this).find("span>img").css("display","block")
		})
		//项目页面提交设备
		$(".contentt0 .sub_btn").click(function() {
			var equip=""
			var idd=""
			$($(".contentt0 .con22")).each(function() {
				if ($(this).find("span>img").css("display") == "block") {
					equip=$(this).children().eq(1).text()
					idd=$(this).attr("value")
					
				}
			})
			var img=$("#project *").not("b")[0]
//			console.log(str1+">"+equip)
			$("#project").html(str1+">"+equip).append(img).attr("idd",idd)
			$(".contentt0").hide()
			$(".contentt0 .box").addClass("display_none")
			$(".contentt0 .box").eq(0).removeClass("display_none")
		})
		//项目页面取消
		$(".contentt0 .btn_solve").click(function() {
			$(".contentt0").hide()
			$(".contentt0 .box").addClass("display_none")
			$(".contentt0 .box").eq(0).removeClass("display_none")
		})
		
		
		
		
		
		var canvas=document.getElementById('mycanvas')
		var context=canvas.getContext('2d')
		var again=document.getElementById('again')
		
		$("#mycanvas").attr("width",$(".content").width())
		
		
		//像素处理
		var img=new Image()
		img.src="../../../static/images/ing_wangge.png"
		img.onload=function() {
			context.drawImage(img,5,5,canvas.width-10,canvas.height-10)
		}
		
		
		context.beginPath()
		context.fillStyle="white"
		context.fillRect(0,0,canvas.width,canvas.height)
		$("#mycanvas").on("touchstart",function(e) {
			e.preventDefault();
		 	var x=e.originalEvent.changedTouches["0"].pageX-canvas.offsetLeft
		 	var y=e.originalEvent.changedTouches["0"].pageY-canvas.offsetTop
		 	context.beginPath()
		 	context.lineWidth=1.5
		 	context.strokeStyle='#333333'
		 	context.moveTo(x,y)
		 	$("#mycanvas").on("touchmove",function(e) {
		 		x=e.originalEvent.changedTouches["0"].pageX-canvas.offsetLeft
		 		y=e.originalEvent.changedTouches["0"].pageY-canvas.offsetTop
		 		context.lineTo(x,y)
		 		context.stroke()
		 	})
		 	$("#mycanvas").on("touchend",function() {
		 		canvas.ontouchmove=''
		 	})
		})
		again.onclick=function() {
//			context.clearRect(0,0,canvas.width,canvas.height)
			var imgs=new Image()
			imgs.src="../../../static/images/ing_wangge.png"
			imgs.onload=function() {
				context.drawImage(img,5,5,canvas.width-10,canvas.height-10)
			}
			context.beginPath()
			context.fillStyle="white"
			context.fillRect(0,0,canvas.width,canvas.height)
		}
	
		
		
		
		
		$("#btns").click(function() {
			var url=canvas.toDataURL("image/png")//"image/png"有没有没有什么区别默认是图片格式
			$("#canvas_img").attr("src",url)
			var repiarType = $(".repiarType.border1").attr("index")
			var typeId = $("#project").attr("idd")
			var descs = $("textarea").val()
			var uploadId = ""
			var repiarPrice = $("#weixiusum").val()
			var macId = $("#equipment").attr("idd")
			var signId = $("#canvas_img").attr("src")
//			console.log(dispatchId,repiarType,typeId,descs,uploadId,repiarPrice,macId,signId)
			$.ajax({
				url: ias.api.serviceFinish
				,contentType : "application/json"
	            ,dataType : "json"
				,method:"post"
				,data: JSON.stringify({
					"id":dispatchId,
					"repiarType":repiarType,
					"typeId":typeId,
					"descs":descs,
				    "uploadId":uploadId,
					"repiarPrice":repiarPrice,
					"macId":macId,
					"signId":signId
				}).encode()
				,success:function(data) {
					if(data.status == 200) {
						alert("成功");
						if (types == 1) {
							window.history.go(-1)
						} else{
							window.history.go(-2)
						}
					} else {
						alert(data.message);
					}
				}
			});
		})
	
	
	
	
	
	
	
	
	
	
	
})
