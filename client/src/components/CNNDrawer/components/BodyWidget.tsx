import * as React from 'react';
import { TrayWidget } from './TrayWidget';
import { Application } from '../Application';
import { TrayItemWidget } from './TrayItemWidget';
import { DefaultNodeModel } from '@projectstorm/react-diagrams';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { DemoCanvasWidget } from './CanvasWidget';
import styled from '@emotion/styled';
import NNLayerFactory from '../../NNLayer';
import { EditWidget } from './EditWidget.jsx';

export interface BodyWidgetProps {
	app: Application;
}

export interface BodyWidgetState {
	isLoading: boolean;
	isSelected: boolean;
	selectedEntity: any;
	type: string;
}

// namespace S {
export const Body = styled.div`
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		min-height: 100%;
		height: 100vh;
	`;

export const Header = styled.div`
		display: flex;
		background: rgb(30, 30, 30);
		flex-grow: 0;
		flex-shrink: 0;
		color: white;
		font-family: Helvetica, Arial, sans-serif;
		padding: 10px;
		align-items: center;
	`;

export const Content = styled.div`
		display: flex;
		flex-grow: 1;
	`;

export const Layer = styled.div`
		position: relative;
		flex-grow: 1;
	`;
// }

export class BodyWidget extends React.Component<BodyWidgetProps, BodyWidgetState> {
	protected NNFactory = new NNLayerFactory()
	constructor(props: any) {
		super(props);
		this.state = {
			isLoading: false,
			isSelected: false,
			selectedEntity: null,
			type: '',
		}
		this.props.app.getActiveDiagram().registerListener({
			linksUpdated: this._handleLinkUpdated
		})
	}
	render() {
		const { isSelected, selectedEntity, type } = this.state
		console.log(isSelected)
		return (
			<Body>
				<Header>
					<div className="title">Storm React Diagrams - DnD demo</div>
				</Header>
				<Content>
					<TrayWidget>
						<TrayItemWidget model={{ type: 'INPUT' }} name="Input Layer" color="rgb(100, 100, 100)" />
						<TrayItemWidget model={{ type: 'HIDDEN' }} name="Hidden Layer" color="rgb(100, 100, 100)" />
						<TrayItemWidget model={{ type: 'OUTPUT' }} name="Output Layer" color="rgb(100, 100, 100)" />
						{isSelected && <EditWidget data={selectedEntity} componentType={type} />}
					</TrayWidget>
					<Layer
						onDrop={this._createNode}
						onDragOver={(event) => {
							event.preventDefault();
						}}>
						<DemoCanvasWidget>
							<CanvasWidget engine={this.props.app.getDiagramEngine()} />
						</DemoCanvasWidget>
					</Layer>
				</Content>
			</Body>
		);
	}
	_handleLinkUpdated = (event: any) => {
		if (!event.isCreated) return;
		const { link } = event;
		link.registerListener({
			selectionChanged: this._handleSelectionLinkChanged
		})
	}
	_handleSelectionLinkChanged = (event: any) => {
		console.log(event)
	}
	_handleSelectionNodeChanged = (event: any) => {
		const node = event.entity;
		while (this.state.isLoading) { }
		this.setState({ isLoading: true });
		switch (node.getOptions().selected) {
			case true:
				this.setState({
					isSelected: true,
					selectedEntity: node,
					type: 'LAYER'
				})
				break;
			case false:
				this.setState({
					isSelected: false,
				})
				break;
			default:
				break;
		}
		this.setState({ isLoading: false })
	}
	_createNode = (event: any) => {
		const { app } = this.props
		var data = JSON.parse(event.dataTransfer.getData('storm-diagram-node'));
		var node: DefaultNodeModel;
		data.selectionHandler = this._handleSelectionNodeChanged
		node = this.NNFactory.createNode(data)
		var point = this.props.app.getDiagramEngine().getRelativeMousePoint(event);
		node.setPosition(point);
		app.getDiagramEngine().getModel().addNode(node);
		this.forceUpdate();
	}
}