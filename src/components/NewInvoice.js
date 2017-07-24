// Modules
import React from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash'
import * as List from '../my_modules/list'
// Stores
import ColumnFieldMapStore from '../stores/ColumnFieldMapStore'
import EmailBodyStore from '../stores/EmailBodyStore'
import ListStore from '../stores/ListStore'
import StatusStore from '../stores/StatusStore'
// Actions
import ListActions from '../actions/ListActions'
import SendGridActions from '../actions/SendGridActions'
// Components
import ColumnFieldMapperGroup from './ColumnFieldMapperGroup'
import EmailPreview from './EmailPreview'
import EmailTester from './EmailTester'
import ListSelector from './ListSelector'
import SectionTitle from './SectionTitle'
import Uploader from './Uploader'
import { Button, Grid, Input, Icon } from 'semantic-ui-react'


export default class NewInvoice extends React.Component {
	constructor() {
		super()
		this.state = {
			status: StatusStore.getState(),
			list: ListStore.getState(),
			lists: ListStore.getLists(),
			emailBody: EmailBodyStore.getState(),
			columnFieldMap: ColumnFieldMapStore.getState(),
			uploadListName: '',
			uploadListFile: null,
			showListSelector: false,
			showListUploader: false,
			showStartButtons: true,
			testEmailAddress:'',
			uploading: false
		}
		this.setUploadListFile = this.setUploadListFile.bind(this);
		this.setTestEmailAddress = this.setTestEmailAddress.bind(this);
		this.hideListUploader = this.hideListUploader.bind(this);
		this.uploadList = this.uploadList.bind(this);
		this.transformList = this.transformList.bind(this);
		this.sendTestEmail = this.sendTestEmail.bind(this);
		this.showListUploader = this.showListUploader.bind(this);
		this.showListSelector = this.showListSelector.bind(this);
		this.setUploadListName = this.setUploadListName.bind(this);
		this.updateList = this.updateList.bind(this)
		this.updateLists = this.updateLists.bind(this)
		this.updateColumnFieldMap = this.updateList.bind(this)
		this.updateEmailBody = this.updateEmailBody.bind(this)
		this.updateStatus = this.updateList.bind(this)
		this.getList = this.getList.bind(this)
	}

	componentWillMount() {
		if(this.state.list) this.setState({showStartButtons: false})
		ListStore.on('change', this.updateList)
		ListStore.on('updated lists', this.updateLists)
		EmailBodyStore.on('change', this.updateEmailBody)
		ColumnFieldMapStore.on('change', this.updateColumnFieldMap)
		StatusStore.on('change', this.updateStatus)
	}

	componentDidMount() {
		ListActions.getAllLists()
	}

	componentWillUnmount() {
		ListStore.removeListener('change', this.updateList)
		ListStore.removeListener('updated lists', this.updateLists)
		EmailBodyStore.removeListener('change', this.updateEmailBody)
		ColumnFieldMapStore.removeListener('change', this.updateColumnFieldMap)
		StatusStore.removeListener('change', this.updateStatus)
	}

	updateLists(){
		console.log('updating this.state.lists');
		this.setState({ lists: ListStore.getLists() })
	}

	updateList(){
		let list = ListStore.getState()
		if(list)	{	this.hideListUploader()
								this.setState({ uploading: false }) }
		this.setState({ list })
	}

	updateEmailBody() {
		this.setState({ emailBody: EmailBodyStore.getState() })
	}

	updateColumnFieldMap() {
		this.setState({ columnFieldMap: ColumnFieldMapStore.getState() })
	}

	updateStatus() {
		this.setState({ status: StatusStore.getState() })
	}

	showListUploader() {
		this.setState({ showStartButtons: false })
		this.setState({ showListUploader: true })
	}

	showListSelector() {
		this.setState({ showStartButtons: false })
		this.setState({ showListSelector: true })
	}

	hideListUploader() {
		this.setState({ showListUploader: false })
	}

	setUploadListName(e) {
		this.setState({ uploadListName: e.target.value });
	}

	setUploadListFile (e) {
		this.setState({ uploadListFile: e.target.files[0] })
	}

	setTestEmailAddress(e){
		this.setState({ testEmailAddress: e.target.value })
	}

	uploadList() {
		let csv = this.state.uploadListFile
		let listName = this.state.uploadListName
		this.setState({ uploading: true })
		ListActions.uploadCsvList(csv, listName)
	}

	transformList() {
		let columnFieldMap = this.state.columnFieldMap
		let listId = this.state.list._id
		ListActions.transformList(listId, columnFieldMap)
	}

	sendTestEmail() {
		let recipient = this.state.testEmailAddress
		let invoice = List.toTextList(this.state.list.invoices[0])
		let body = this.state.emailBody.concat(invoice)
		SendGridActions.sendInvoice(recipient, body)
	}

	getList(e, { value }) {
		ListActions.getList(value)
	}

	render () {
		return (
			<div>
				{ this.state.showStartButtons &&
					<div>
						<SectionTitle title='Fetch invoices from ...' /><br/>
						<Button color='green' onClick={this.showListUploader} icon>
							<Icon name='upload' />
							Create a new list
						</Button>
						<Button color='blue' onClick={this.showListSelector}>Select an existing list</Button>
					</div> }
				{ this.state.showListSelector &&
						<ListSelector lists={this.state.lists} listSelector={this.getList} />
				}
				{ this.state.showListUploader &&
						<div>
							<SectionTitle title='Upload a .csv list.' /><br/>
							<Grid columns={2}>
								<Grid.Row>
									<Grid.Column>
										<Input fluid placeholder='List name' onChange={this.setUploadListName}/>
										<br />
										<Uploader changeHandler={this.setUploadListFile} />
										<br />
										<Button color='green' loading={this.state.uploading} onClick={this.uploadList}>Upload</Button>
									</Grid.Column>
								</Grid.Row>
							</Grid>
						</div> }
				<br/>
				{ this.state.list &&
					this.state.list.rawUpload &&
					<div>
						<SectionTitle title={`Map columns to required data for ${this.state.list.name}`} /><br/>
						<ColumnFieldMapperGroup
							columns={_.keys(this.state.list.invoices[0])}
							fields={_.keys(this.state.columnFieldMap)}
						/><br/>
					<Button color='green' onClick={this.transformList}>Continue</Button>
					</div> }

				{ this.state.list &&
					!this.state.list.rawUpload &&
					<div>
						<SectionTitle title={`Preview and test your email.`} /><br/>
						<EmailPreview invoiceText={this.state.emailBody} invoice={List.toTextList(this.state.list.invoices[0])}/><br/>
						<h3>Send a test email:</h3>
						<EmailTester
							changeHandler={this.setTestEmailAddress} sendFunction={this.sendTestEmail} sending={this.state.status.emailSending}/>
					</div> }
			</div>
		)
	}
}
