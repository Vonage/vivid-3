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
    {%- if item.releaseStatus != 'Done' -%}
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
