import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';

import { Header } from "./header";

class TableOfContents extends React.Component {

	constructor(props) {

		super(props);

	}

	render() {

		return (
			<div className="toc">

				<Header 
					image={this.props.app.getCover()} 
					header={this.props.app.getTitle()} 
					content={
						<div>
							<em>by</em> {this.props.app.getAuthors()}
							<small>
								{this.props.app.getContributors() ? 
								<span> with contributions from {this.props.app.getContributors()}</span> : null}
							</small>
						</div>
					}
				/>
				
				<p className="tight">{this.props.app.getDescription()}</p>

				<h2>Chapters</h2>

				<table className="table">
					<tbody>
						{
							_.map(this.props.app.getChapters(), (chapter, index) => {
								return (
									<tr key={"chapter" + index}>
										<td><em>{chapter[0]}</em></td>
										<td>
											{
												// If it's not loaded, say so.
												this.props.app.getContent(chapter[1]) === undefined ?
													<span>Loading...</span> :
												// If it failed to load, say so.
												this.props.app.getContent(chapter[1]) === null ?
													<span>Unable to load this chapter</span> :
												// If it did load, link it!
												<Link to={"/" + chapter[1]}>{chapter[0]}</Link>
											}
										</td>
									</tr>
								)
							})
						}
					</tbody>
				</table>

				<h2>Revision history</h2>
				
				<ul>
					{_.map(this.props.app.getRevisions(), (revision, index) => {
						return <li key={"revision" + index}><em>{revision[0]}</em>. {revision[1]}</li>;
					})}
				</ul>

			</div>
		);

	}

}

export {TableOfContents};