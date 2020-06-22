import * as React from 'react';
import styled from '@emotion/styled';

// eslint-disable-next-line @typescript-eslint/no-namespace
// namespace S {
	export const Tray = styled.div`
		min-width: 250px;
		padding: 10px 0px 10px 0px;
		background: rgb(40, 40, 40);
		flex-grow: 0;
		flex-shrink: 0;
	`;
// }

export class TrayWidget extends React.Component {
	render() {
		return <Tray>{this.props.children}</Tray>;
	}
}