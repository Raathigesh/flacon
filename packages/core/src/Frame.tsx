import * as React from "react";
import styled from "styled-components";
import { Popover, Button } from "@blueprintjs/core";
import { observer } from "mobx-react";
import Port from "./Port";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const Card = styled.div`
  padding: 10px;
  min-width: 150px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-content: space-between;
  font-size: 15px;
`;

const Content = styled.div`padding-top: 10px;`;

export interface IFrame {
  node: any;
  name: string;
  isDebug?: boolean;
  icon: string;
  children?: any;
  details?: any;
  onRemove?: () => void;
  onDebugToggle?: () => void;
  onRemoveLink: () => void;
}

const IconPanel = styled.div`
  border: 1px solid #e2e2e2;
  border-radius: 5px;
`;

function Frame({
  node,
  name,
  isDebug,
  children,
  details,
  icon,
  onRemove,
  onDebugToggle,
  onRemoveLink
}: IFrame) {
  return (
    <Container>
      {node.getInPorts().map(port => {
        return <Port node={port.getParent()} name={port.name} />;
      })}
      <Card className="pt-card pt-elevation-0">
        <Header>
          <IconPanel className="pt-button-group pt-minimal">
            <a className={`pt-button ${icon}`}>{name}</a>
            <Button
              iconName="pt-icon-selection"
              onClick={onDebugToggle}
              active={isDebug}
            />
            <a
              className="pt-button pt-icon-cross pt-intent-primary"
              role="button"
              onClick={onRemove}
            />
            <Popover>
              <a
                className="pt-button pt-icon-wrench pt-intent-success"
                role="button "
              />
              {details}
            </Popover>
          </IconPanel>
        </Header>
        <Content>{children}</Content>
      </Card>
      {node.getOutPorts().map(port => {
        return (
          <Port
            node={port.getParent()}
            name={port.name}
            onRemove={onRemoveLink}
          />
        );
      })}
    </Container>
  );
}

export default observer(Frame);
