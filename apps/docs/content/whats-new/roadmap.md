---
title: Roadmap
order: 2
---

# Roadmap

## Upcoming Features

<style>
  vwc-data-grid {
    margin-block: 20px;
  }
  @media screen and (max-width: 768px){
    vwc-data-grid {
      inline-size: calc(100vw - 32px);
    }
    vwc-data-grid-cell {
      min-inline-size: 110px;
    }
    vwc-data-grid-cell:first-child {
      position: sticky;
      left: 0;
      background: var(--vvd-color-canvas);
      z-index: 1;
      border-right: 1px solid var(--vvd-color-neutral-200);
      box-shadow: 6px 1px 5px -3px rgba(145,144,144,0.25);
    }
  }
</style>

<script>
fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vQ78yikjA1tTHQ_T6JbvbU83Kxq93BGePPyLgkgHjmG8VyHZfbI7vaMXPAs6MvvdY2S9yhBxY4LTgaK/pub?output=csv')
  .then(response => response.text())
  .then(csvText => {
    const rows = csvText.trim().split('\n');
    const headers = rows[0].split(',');
    // Map remaining rows into objects
    const data = rows.slice(1).map(row => {
      const values = row.split(',');
      return headers.reduce((obj, header, index) => {
        obj[header] = values[index];
        return obj;
      }, {});
    });

    const container = document.querySelector('vwc-data-grid'); // container for the rows

    data.forEach(item => {
      if (item.release_status !== 'Done') {
        const row = document.createElement('vwc-data-grid-row');

        // Name column
        const nameCell = document.createElement('vwc-data-grid-cell');
        const nameUrl = item.release_status !== 'Alpha' ? item.jira_link : item.release_link;
        nameCell.innerHTML = `<a href="${nameUrl}">${item.name}</a>`;
        row.appendChild(nameCell);

        // Discovery column
        const discoveryCell = document.createElement('vwc-data-grid-cell');
        if (item.discovery_status === 'Done') {
          discoveryCell.innerHTML = `
            <vwc-button label="Done" appearance="ghost-light" connotation="success" href="${item.discovery_link}">
              <vwc-icon slot="icon" name="check"></vwc-icon>
            </vwc-button>
          `;
        } else if (item.discoveryStatus === 'InProgress') {
          discoveryCell.innerHTML = `
            <vwc-button label="In Progress" appearance="ghost-light" connotation="cta" target="_blank" href="${item.discovery_link}"></vwc-button>
          `;
        }
        row.appendChild(discoveryCell);

        // Design column
        const designCell = document.createElement('vwc-data-grid-cell');
        if (item.design_status === 'Done') {
          designCell.innerHTML = `
            <vwc-button label="Done" appearance="ghost-light" connotation="success" href="${item.design_link}" target="_blank">
              <vwc-icon slot="icon" name="check"></vwc-icon>
            </vwc-button>
          `;
        } else if (item.design_status === 'InProgress') {
          designCell.innerHTML = `
            <vwc-button label="In Progress" appearance="ghost-light" connotation="cta" href="${item.design_link}"></vwc-button>
          `;
        } else {
          designCell.innerHTML = `<span>Expected: ${item.design_date}</span>`;
        }
        row.appendChild(designCell);

        // Release column
        const releaseCell = document.createElement('vwc-data-grid-cell');
        if (item.releaseStatus === 'Done') {
          releaseCell.innerHTML = `
            <vwc-badge text="Released: ${item.release_date}" connotation="success">
              <vwc-icon slot="icon" name="check"></vwc-icon>
            </vwc-badge>
          `;
        } else if (item.release_status === 'Alpha') {
          releaseCell.innerHTML = `
            <vwc-badge text="Alpha: ${item.release_date}" connotation="warning" appearance="subtle">
              <vwc-icon slot="icon" name="check"></vwc-icon>
            </vwc-badge>
          `;
        } else {
          releaseCell.innerHTML = `<span>Expected: ${item.release_date}</span>`;
        }
        row.appendChild(releaseCell);

        container.appendChild(row);
      }
    });
  });
</script>

<vwc-data-grid>
  <vwc-data-grid-row role="row" class="header" row-type="header">
    <vwc-data-grid-cell cell-type="columnheader" role="columnheader">
      Name
    </vwc-data-grid-cell>
    <vwc-data-grid-cell cell-type="columnheader" role="columnheader">
      Discovery
    </vwc-data-grid-cell>
    <vwc-data-grid-cell cell-type="columnheader" role="columnheader">
      Design
    </vwc-data-grid-cell>
    <vwc-data-grid-cell cell-type="columnheader" role="columnheader">
      Release
    </vwc-data-grid-cell>
  </vwc-data-grid-row>
  <div id="roadmapTableBody"></div>
</vwc-data-grid>

### Key

| Term      | Description                                                                                                          |
| --------- | -------------------------------------------------------------------------------------------------------------------- |
| Discovery | Validate the shared value of the feature and that we understand the problem well enough to commit further resources. |
| Design    | Ensure designs meet user needs while upholding our brand standards and visual language.                              |
| Alpha     | Component is available and documentation is published.                                                               |

## Completed Features

<vwc-data-grid>
  <vwc-data-grid-row role="row" class="header" row-type="header">
    <vwc-data-grid-cell cell-type="columnheader" role="columnheader">
      Name
    </vwc-data-grid-cell>
    <vwc-data-grid-cell cell-type="columnheader" role="columnheader">
      Discovery
    </vwc-data-grid-cell>
    <vwc-data-grid-cell cell-type="columnheader" role="columnheader">
      Design
    </vwc-data-grid-cell>
    <vwc-data-grid-cell cell-type="columnheader" role="columnheader">
      Release
    </vwc-data-grid-cell>
  </vwc-data-grid-row>
  {%- for item in roadmapItems %}
    {%- if item.releaseStatus == 'Done' -%}
    <vwc-data-grid-row>
      <vwc-data-grid-cell><a href="{{item.titleUrl}}">{{item.title}}</a></vwc-data-grid-cell>
      <vwc-data-grid-cell>
        {%- if item.discoveryStatus == 'Done' %}
          <vwc-button label="Done" appearance="ghost-light" connotation="success" href="{{item.discoveryUrl}}">
            <vwc-icon slot="icon" name="check"></vwc-icon>
          </vwc-button>
        {% endif -%}
        {%- if item.discoveryStatus == 'InProgress' %}
          <vwc-button label="In Progress" appearance="ghost-light" connotation="cta" href="{{item.discoveryUrl}}"></vwc-button>
        {% endif -%}
      </vwc-data-grid-cell>
      <vwc-data-grid-cell>
        {%- if item.designStatus == 'Done' %}
          <vwc-button label="Done" appearance="ghost-light" connotation="success" href="{{item.designUrl}}">
            <vwc-icon slot="icon" name="check"></vwc-icon>
          </vwc-button>
        {% endif -%}
        {%- if item.designStatus == 'InProgress' %}
          <vwc-button label="In Progress" appearance="ghost-light" connotation="cta" href="{{item.designUrl}}"></vwc-button>
        {% endif -%}
      </vwc-data-grid-cell>
      <vwc-data-grid-cell>
        {%- if item.releaseStatus == 'Done' %}
          <vwc-badge text="Released: {{item.releaseCompletionDate}}" connotation="success">
            <vwc-icon slot="icon" name="check"></vwc-icon>
          </vwc-button>
        {% else -%}
          {%- if item.releaseStatus == 'AwaitingAT' %}
            <vwc-badge text="Alpha: {{item.releaseCompletionDate}}" connotation="warning" appearance="subtle">
              <vwc-icon slot="icon" name="check"></vwc-icon>
            </vwc-button>
          {%- else -%}
            <span>Expected: {{item.releaseCompletionDate}}</span>
          {% endif -%}
        {% endif -%}
      </vwc-data-grid-cell>
    </vwc-data-grid-row>
    {%- endif -%}
  {%- endfor %}
</vwc-data-grid>
