Ext.Loader.setConfig({enabled: true}); 
Ext.Loader.setPath('Ext.ux', 'code/ux');
Ext.require(['Ext.ux.form.SearchField','Ext.selection.CheckboxModel']);

Ext.onReady(function(){
	Ext.define('Geng.model.MyData',{
		extend: 'Ext.data.Model',
		fields: [
			'UserName',
			'Sex',
			'Age',
			'No',
			'Clz'
		]		
	});
	
	var store = Ext.create('Ext.data.Store',{
		model: 'Geng.model.MyData',
		pageSize: 5,
		proxy:{
			type: 'ajax',
			url: 'mydata.json',
			reader: {
				type: 'json',
				root: 'items'
			}
		},
		autoLoad:true
	});
	
	
	var grid = Ext.create('Ext.grid.Panel',{
		store: store,
		columnLines: true,
		selModel: Ext.create('Ext.selection.CheckboxModel'),
		columns:[{
			text:'基本信息',
			columns: [
			{
				text:'姓名', width:120, dataIndex:'UserName',sortable:true
			},
			{
				text:'性别', flex:1, dataIndex:'Sex',sortable:false
			}
			]},
			{
				text:'年龄', width:100, dataIndex:'Age',sortable:true
			},
			{
				text:'学号', width:100, dataIndex:'No',sortable:true
			},
			{
				text:'班级', width:100, dataIndex:'Clz',sortable:true
			}		
		],
		width:480,
		title: 'Grid Sample',
		renderTo: Ext.getBody(),
		viewConfig: {
			stripeRows:true
		},
		style: {
			'margin' : '20px'
		},
		bbar: Ext.create('Ext.PagingToolbar',{
			store:store,
			displayInfo:true,
			displayMsg: '显示{0}-{1}条， 共计{2}条',
			emptyMsg: '没有数据'
			
		}),
		
		dockedItems:[
			{
				dock:'top',
				xtype:'toolbar',
				items:[{
						xtype:'button',
						text:'显示所选',
						tooltip:'show your selected',
						handler:function(){
							var records = grid.getSelectionModel().getSelection();
							if(records.length===0) {
								Ext.MessageBox.show({
									title:'提示',
									msg:'请选择需要的行',
									icon: Ext.MessageBox.WARNING
								});
							} else {
								var cnt = [];
								for(var i=0;i<records.length;i++) {
									cnt.push(records[i].get('UserName')+'-'+records[i].get('Clz'))
								}
								Ext.MessageBox.show({
									title:'提示',
									msg:cnt.join('<br/>'),
									icon: Ext.MessageBox.INFO
								});
							}
						},
						scope:this
					},'-',
					{
						width:300,
						fieldLabel:'搜索',
						labelWidth:50,
						xtype:'searchfield',
						store:store
					}
				]
			}
		]
		
	});
	
	
	
	
});