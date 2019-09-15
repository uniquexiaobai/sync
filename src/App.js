import React from "react";
import { Tabs } from "antd";
import Push from './Push';
import Pull from './Pull';

import './App.css';

const { TabPane } = Tabs;

function App() {
	return (
		<div className="app">
			<h1 className="header">Sync</h1>
			
			<div className="main">
				<Tabs defaultActiveKey="push">
					<TabPane tab="push" key="push">
						<Push />
					</TabPane>
					<TabPane tab="pull" key="pull">
						<Pull />
					</TabPane>
				</Tabs>
			</div>
		</div>
	);
}

export default App;
