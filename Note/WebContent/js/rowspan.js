Ext.onReady(function() {
	function columnRenderer(value, metaData, record, rowIndex, colIndex, store,
			view) {
		var fieldName = view.panel.columns[colIndex].dataIndex;
		fieldValue = record.get(fieldName + 'RowSpan');
		if (fieldValue && fieldValue > 1)
			metaData.tdAttr = ' rowspan="' + fieldValue + '"'
					+ ' valign="middle"';
		fieldValue = record.get(fieldName + 'ColSpan');
		if (fieldValue && fieldValue > 1)
			metaData.tdAttr = ' colspan="' + fieldValue + '"';
		return value;
	};
	new Ext.Container({
				renderTo: Ext.get('example'),
				style: {
					'margin-top' : '10px'				
				},
				items : {
					xtype : 'grid',
					columnLines : true,
					width : 710,
					plugins : [Ext.create('Ext.grid.plugin.CellEditing', {
								clicksToEdit : 1
							})],
					store : new Ext.data.ArrayStore({
								fields : [{
											name : 'company'
										}, {
											name : 'price',
											type : 'float'
										}, {
											name : 'change',
											type : 'float'
										}, {
											name : 'pctChange',
											type : 'float'
										}, {
											name : 'lastChange',
											type : 'date',
											dateFormat : 'n/j h:ia'
										}, {
											name : 'industry'
										}, {
											name : 'industryRowSpan'
										}, {
											name : 'industryRowSpanIndex'
										}],
								data : [
										['3m Co', 71.72, 0.02, 0.03,
												'4/2 12:00am', 'Manufacturing',
												3, 0],
										['Alcoa Inc', 29.01, 0.42, 1.47,
												'4/1 12:00am', 'Manufacturing',
												1, 1],
										['Altria Group Inc', 83.81, 0.28, 0.34,
												'4/3 12:00am', 'Manufacturing',
												1, 2],
										['American Express Company', 52.55,
												0.01, 0.02, '4/8 12:00am',
												'Finance', 1, 0],
										['American International Group, Inc.',
												64.13, 0.31, 0.49,
												'4/1 12:00am', 'Services', 1, 0]],
								sortInfo : {
									field : 'industry',
									direction : 'ASC'
								}
							}),
					columns : [{
								header : "Industry",
								width : 200,
								sortable : true,
								dataIndex : 'industry',
								renderer : columnRenderer,
								editor : 'textfield'
							}, {
								header : "Company",
								width : 300,
								sortable : true,
								dataIndex : 'company',
								editor : 'textfield'
							}, {
								header : "Price",
								width : 100,
								sortable : true,
								renderer : Ext.util.Format.usMoney,
								dataIndex : 'price',
								editor : 'numberfield'
							}, {
								header : "Change",
								width : 100,
								sortable : true,
								dataIndex : 'change',
								renderer : Ext.util.Format.usMoney,
								editor : 'textfield'
							}]
				}
			});
});