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

<vwc-data-grid selection-mode="single-row">
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
      Alpha
    </vwc-data-grid-cell>
  </vwc-data-grid-row>
  <vwc-data-grid-row>
    <vwc-data-grid-cell>
      Text Editor
    </vwc-data-grid-cell>
    <vwc-data-grid-cell>
      <vwc-button label="In Progress" icon="more-horizontal-line" connotation="warning" href="https://docs.google.com/document/d/18Y2-LNwyOzTQ8a2FqYmPx3w-ofWjRstVyMx_9e7Z6vg/edit?tab=t.0#heading=h.8z0p4ep2y9ul"></vwc-button>
    </vwc-data-grid-cell>
    <vwc-data-grid-cell></vwc-data-grid-cell>
    <vwc-data-grid-cell>
      Expected Q1 2025 (Phase 1)
    </vwc-data-grid-cell>
  </vwc-data-grid-row>
  <vwc-data-grid-row>
    <vwc-data-grid-cell>
      <a href="/components/date-picker/">Date Picker</a> (add time selection)
    </vwc-data-grid-cell>
    <vwc-data-grid-cell>
      <vwc-button label="Done" icon="check" connotation="success" href="https://jira.vonage.com/browse/VIV-2073"></vwc-button>
    </vwc-data-grid-cell>
    <vwc-data-grid-cell>
      <vwc-button label="In Progress" icon="more-horizontal-line" connotation="warning" href="https://jira.vonage.com/browse/VIV-2073"></vwc-button>
    </vwc-data-grid-cell>
    <vwc-data-grid-cell>
      Expected Q1 2025
    </vwc-data-grid-cell>
  </vwc-data-grid-row>
  <vwc-data-grid-row>
    <vwc-data-grid-cell>
      <a href="/components/searchable-select">Searchable Select</a>
    </vwc-data-grid-cell>
    <vwc-data-grid-cell>
      <vwc-button label="Done" icon="check" href="https://confluence.vonage.com/display/VIVID/Multi-select+combobox+research" connotation="success"></vwc-button>
    </vwc-data-grid-cell>
    <vwc-data-grid-cell>
      <vwc-button label="Done" icon="check" href="https://www.figma.com/design/Zau4yNbnfBCBT53FZDoLr2/%C2%A0Multiselect-Combobox?node-id=1-3&t=c5CHXRHGC946vCQu-0" connotation="success"></vwc-button>
    </vwc-data-grid-cell>
    <vwc-data-grid-cell>
      <vwc-button label="Awaiting AT" icon="more-horizontal-line" href="/components/searchable-select" connotation="success"></vwc-button>
    </vwc-data-grid-cell>
  </vwc-data-grid-row>
  <vwc-data-grid-row>
    <vwc-data-grid-cell>
      <a href="/components/range-slider/">Range Slider</a>
    </vwc-data-grid-cell>
    <vwc-data-grid-cell>
      <vwc-button label="Done" target="_blank" href="https://confluence.vonage.com/display/VIVID/Range+slider" icon="check" connotation="success"></vwc-button>
    </vwc-data-grid-cell>
    <vwc-data-grid-cell>
    <vwc-button label="Done" target="_blank" href="https://www.figma.com/file/JJNgZvt1qf3ydYmOwbE3Jg/Vivid-UI-Kit---3.0-WIP?type=design&node-id=31345%3A96328&mode=design&t=QNhBeU12Gu7dtS7N-1" icon="check" connotation="success"></vwc-button>
    </vwc-data-grid-cell>
    <vwc-data-grid-cell>
      <vwc-button label="Awaiting AT" icon="more-horizontal-line" href="/components/range-slider/" connotation="success"></vwc-button>
    </vwc-data-grid-cell>
  </vwc-data-grid-row>
  <vwc-data-grid-row>
    <vwc-data-grid-cell>
      <a href="/components/video-player/">Video Player</a>
    </vwc-data-grid-cell>
    <vwc-data-grid-cell>
      <vwc-button label="Done" icon="check" target="_blank" icon="check" href="https://confluence.vonage.com/display/VIVID/Video+player" connotation="success"></vwc-button>
    </vwc-data-grid-cell>
    <vwc-data-grid-cell>
      <vwc-button label="Done" icon="check" target="_blank" href="https://www.figma.com/file/tWEyQlBY6cBymajaJPLSy0/Vivid-3.0-WIP-Drafts?type=design&node-id=23%3A13702&mode=design&t=PGI1aODhsHS1YDhV-1" connotation="success"></vwc-button>
    </vwc-data-grid-cell>
    <vwc-data-grid-cell>
      <vwc-button label="Awaiting AT" icon="more-horizontal-line" href="/components/video-player/" connotation="success"></vwc-button>
    </vwc-data-grid-cell>
  </vwc-data-grid-row>
  <vwc-data-grid-row>
    <vwc-data-grid-cell>
      <a href="/components/time-picker/">Time Picker</a>
    </vwc-data-grid-cell>
    <vwc-data-grid-cell>
      <vwc-button label="Done" icon="check" connotation="success"></vwc-button>
    </vwc-data-grid-cell>
    <vwc-data-grid-cell>
    <vwc-button label="Done" target="_blank" href="https://www.figma.com/file/JJNgZvt1qf3ydYmOwbE3Jg/Vivid-UI-Kit---3.0-WIP?type=design&node-id=31345%3A96328&mode=design&t=QNhBeU12Gu7dtS7N-1" icon="check" connotation="success"></vwc-button>
    </vwc-data-grid-cell>
    <vwc-data-grid-cell>
      <vwc-button label="Done" icon="check" href="/components/time-picker/" connotation="success"></vwc-button>
    </vwc-data-grid-cell>
  </vwc-data-grid-row>
  <vwc-data-grid-row>
    <vwc-data-grid-cell>
      <a href="/components/dial-pad/">Dial Pad</a>
    </vwc-data-grid-cell>
    <vwc-data-grid-cell>
      <vwc-button label="Done" target="_blank" href="https://confluence.vonage.com/pages/viewpage.action?spaceKey=VIVID&title=Dial+pad" icon="check" connotation="success"></vwc-button>
    </vwc-data-grid-cell>
    <vwc-data-grid-cell>
    <vwc-button label="Done" target="_blank" href="https://www.figma.com/file/tWEyQlBY6cBymajaJPLSy0/Vivid-3.0-WIP-Drafts?type=design&node-id=67-39674&mode=design&t=X4VuTNKdOR3AX037-0" icon="check" connotation="success"></vwc-button>
    </vwc-data-grid-cell>
    <vwc-data-grid-cell>
      <vwc-button label="Done" icon="check" href="/components/dial-pad/" connotation="success"></vwc-button>
    </vwc-data-grid-cell>
  </vwc-data-grid-row>
</vwc-data-grid>

### Key

| Term      | Description                                                                                                          |
| --------- | -------------------------------------------------------------------------------------------------------------------- |
| Discovery | Validate the shared value of the feature and that we understand the problem well enough to commit further resources. |
| Design    | Ensure designs meet user needs while upholding our brand standards and visual language.                              |
| Alpha     | Component is available and documentation is published.                                                               |
| AT        | Acceptance testing: before we fully release a new component it must be integrated and validated by at least 2 teams  |
