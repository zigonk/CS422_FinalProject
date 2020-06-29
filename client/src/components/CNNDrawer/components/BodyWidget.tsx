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
import { layerList, extractLinkInformation } from '../../Utils'
import EditHyperParametersForm from '../../EditForm/EditHyperParametersForm.jsx'

export interface BodyWidgetProps {
	app: Application;
}

export interface BodyWidgetState {
	isLoading: boolean;
	isSelected: boolean;
	selectedEntity: any;
	type: string;
	hyperparameters: any;
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
			hyperparameters: {
				lr: 0,
				optimizer: 'RMSProps'
			}
		}
	}
	render() {
		const { isSelected, selectedEntity, type, hyperparameters } = this.state
		return (
			<Body>
				<Header>
					<div className="title">Deep Learning Builder</div>
				</Header>
				<Content>
					<TrayWidget>
						{!isSelected &&
							(<div>
								{layerList.map((layer, ind) =>
									<TrayItemWidget key={ind} model={{ type: layer.type }} name={layer.name} color="rgb(100, 100, 100)" />
								)}
								<EditHyperParametersForm data={hyperparameters} updateValue={this._handleSubmit}/>
							</div>)
						}
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
				if (this.state.selectedEntity.getOptions().id !== node.getOptions().id) return;
				this.setState({
					isSelected: false,
				})
				break;
			default:
				break;
		}
		this.setState({ isLoading: false })
	}
	_handleRemoveNode = () => {
		this.setState({ isSelected: false })
	}
	_createNode = (event: any) => {
		const { app } = this.props
		var data = JSON.parse(event.dataTransfer.getData('storm-diagram-node'));
		var node: DefaultNodeModel;
		data.selectionHandler = this._handleSelectionNodeChanged
		data.removeHandler = this._handleRemoveNode
		node = this.NNFactory.createNode(data)
		var point = this.props.app.getDiagramEngine().getRelativeMousePoint(event);
		node.setPosition(point);
		app.getDiagramEngine().getModel().addNode(node);
		this.forceUpdate();
	}
	_handleSubmit = () => {
		const { app } = this.props;
		const diagram = app.getActiveDiagram()
		const nodeList = diagram.getNodes().map((node, ind) => node.serialize())
		const modelLinks = diagram.getLinks().map(extractLinkInformation)
		debugger
	}
}