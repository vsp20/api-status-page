import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  padding: 5px;
`;

const StatusTable = styled.table`
  width: 50%;
  margin-right: auto;
  margin-left: auto;
`;

const TableRow = styled.tr`
  padding: 10px;
  height: 10%;
  font-size: 20px;
`;

const ApiName = styled.td``;

const ApiStatus = styled.td``;

const ApiHostname = styled.td``;

enum Status {
  Healthy = "healthy",
  Error = "down",
  Loading = "loading",
}

function App() {
  const [apiNames, setApiNames] = useState({
    accounts: { status: Status.Loading, hostname: "" },
    assets: { status: Status.Loading, hostname: "" },
    customer: { status: Status.Loading, hostname: "" },
    datapoints: { status: Status.Loading, hostname: "" },
    devices: { status: Status.Loading, hostname: "" },
    documents: { status: Status.Loading, hostname: "" },
    forms: { status: Status.Loading, hostname: "" },
    invites: { status: Status.Loading, hostname: "" },
    media: { status: Status.Loading, hostname: "" },
    messages: { status: Status.Loading, hostname: "" },
    namespaces: { status: Status.Loading, hostname: "" },
    orders: { status: Status.Loading, hostname: "" },
    patients: { status: Status.Loading, hostname: "" },
    relationships: { status: Status.Loading, hostname: "" },
    rules: { status: Status.Loading, hostname: "" },
    templates: { status: Status.Loading, hostname: "" },
    users: { status: Status.Loading, hostname: "" },
    workflows: { status: Status.Loading, hostname: "" },
  });

  useEffect(() => {
    const intervalId = setInterval(() => fetchApiStatuses(), 15000);
    fetchApiStatuses();
    return () => clearInterval(intervalId);
  }, []);

  async function fetchApiStatuses(): Promise<boolean> {
    let apiNamesCopy = { ...apiNames };
    for (let name of Object.keys(apiNames)) {
      const url = `http://api.factoryfour.com/${name}/health/status`;
      await axios
        .get(url)
        .then((res) => {
          apiNamesCopy = {
            ...apiNamesCopy,
            [name]: { status: Status.Healthy, hostname: res.data.hostname },
          };
        })
        .catch((res) => {
          apiNamesCopy = {
            ...apiNamesCopy,
            [name]: { status: Status.Error, hostname: "" },
          };
        });
    }
    setApiNames(apiNamesCopy);
    return true;
  }

  return (
    <Container>
      <StatusTable>
        <thead style={{ textAlign: "left" }}>
          <tr>
            <th>Name</th>
            <th>Hostname</th>
            <th>Status</th>
          </tr>
          <th></th>
        </thead>
        {Object.entries(apiNames).map(([name, value]) => {
          return (
            <TableRow>
              <ApiName>{name}</ApiName>
              <ApiHostname>{value.hostname}</ApiHostname>
              <ApiStatus>
                {value.status == Status.Healthy ? (
                  <FontAwesomeIcon
                    icon={faCheck}
                    style={{ color: "#1fb650" }}
                  />
                ) : (
                  <FontAwesomeIcon icon={faTimes} style={{ color: "red" }} />
                )}
              </ApiStatus>
            </TableRow>
          );
        })}
      </StatusTable>
    </Container>
  );
}

export default App;
