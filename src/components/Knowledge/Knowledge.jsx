import React from "react"
import {Redirect, Route, Switch} from "react-router-dom"
import Classrooms from "./Classroom/Classrooms"
import Disciplines from "./Discipline/Disciplines"
import Groups from "./Group/Groups"
import Teachers from "./Teacher/Teachers"
import Times from "./Time/Times"
import Check from "./Check/Check"

export default class Knowledge extends React.Component {
	constructor(props) {
		super(props)

		let knowledge = JSON.parse(localStorage.getItem('knowledge'))
		if (knowledge == null) {
			knowledge = {}
		}
		this.state = {
			knowledge: knowledge,
		}

		this.setKnowledge = this.setKnowledge.bind(this)
		this.getKnowledge = this.getKnowledge.bind(this)
		this.validate = this.validate.bind(this)
	}

	componentDidMount() {
		document.title = 'Редактор знаний'
	}

	getKnowledge() {
		return this.state.knowledge
	}

	setKnowledge(newKnowledge) {
		this.setState({
			knowledge: newKnowledge,
		})
		const stringKnowledge = JSON.stringify(newKnowledge)
		localStorage.setItem('knowledge', stringKnowledge)
		this.validate(false)
	}

	validate(valid) {
		const stringValid = JSON.stringify(valid)
		localStorage.setItem('knowledgeValid', stringValid)
	}

	render() {
		return (
			<div className="uk-width-expand">
				<div>
					<form className="uk-flex uk-flex-center uk-flex-column tabContent">
						<Switch>
							<Redirect exact from="/knowledge" to="/knowledge/classrooms"/>
							<Route path="/knowledge/classrooms">
								<Classrooms classrooms={this.state.knowledge.classrooms}
											setKnowledge={this.setKnowledge}
											getKnowledge={this.getKnowledge}/>
							</Route>
							<Route path="/knowledge/disciplines">
								<Disciplines disciplines={this.state.knowledge.disciplines}
											 setKnowledge={this.setKnowledge}
											 getKnowledge={this.getKnowledge}/>
							</Route>
							<Route path="/knowledge/groups">
								<Groups groups={this.state.knowledge.groups}
										disciplines={this.state.knowledge.disciplines}
										setKnowledge={this.setKnowledge}
										getKnowledge={this.getKnowledge}/>
							</Route>
							<Route path="/knowledge/teachers">
								<Teachers teachers={this.state.knowledge.teachers}
										  disciplines={this.state.knowledge.disciplines}
										  setKnowledge={this.setKnowledge}
										  getKnowledge={this.getKnowledge}/>
							</Route>
							<Route path="/knowledge/times">
								<Times times={this.state.knowledge.times}
									   setKnowledge={this.setKnowledge}
									   getKnowledge={this.getKnowledge}/>
							</Route>
							<Route path="/knowledge/check">
								<Check getKnowledge={this.getKnowledge}
									   validate={this.validate}
									   setKnowledge={this.setKnowledge}/>
							</Route>
						</Switch>
					</form>
				</div>
			</div>
		)
	}
}
