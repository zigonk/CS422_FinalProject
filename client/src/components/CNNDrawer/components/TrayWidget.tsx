import * as React from 'react';
import styled from '@emotion/styled';

// eslint-disable-next-line @typescript-eslint/no-namespace
// namespace S {
export const Tray = styled.div`
		min-width: 300px;
		height: 100vh;
		overflow: auto;
		padding: 50px 20px 10px 20px;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 1000;
		background: rgb(40, 40, 40);
		flex-grow: 0;
		box-sizing: border-box;
		flex-shrink: 0;
		::-webkit-scrollbar {
			width: 10px;
			radius: 2px;
			position: absolute;
			right: -10;
		}
		::-webkit-scrollbar-thumb {
			background: #333;
			border-radius: 5px;
		}
		::-webkit-scrollbar-thumb:hover {
			background: #555;
		}
	`;
// }

export class TrayWidget extends React.Component {
	render() {
		return <Tray>{this.props.children}</Tray>;
	}
}