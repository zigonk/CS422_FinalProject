import * as React from 'react';
import styled from '@emotion/styled';

export interface TrayItemWidgetProps {
	model: any;
	color?: string;
	name: string;
}

// namespace S {
	export const Tray = styled.div<{ color: string }>`
		color: white;
		padding: 5px;
		margin: 20px 0px 20px 0px;
		line-height: 40px;
		height: 40px;
		background-color: ${(p) => p.color};
		text-align: center;
		color: white;
		border-radius: 5px;
		cursor: pointer;
	`;
// }

export class TrayItemWidget extends React.Component<TrayItemWidgetProps> {
	render() {
		const color = this.props.color || ''
		return (
			<Tray
				color={color}
				draggable={true}
				onDragStart={(event) => {
					event.dataTransfer.setData('storm-diagram-node', JSON.stringify(this.props.model));
				}}
				className="tray-item">
				{this.props.name}
			</Tray>
		);
	}
}