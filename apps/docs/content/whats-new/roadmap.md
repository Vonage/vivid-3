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
      <a href="https://jira.vonage.com/browse/VIV-2506">International Phone Number Field</a>
    </vwc-data-grid-cell>
    <vwc-data-grid-cell></vwc-data-grid-cell>
    <vwc-data-grid-cell></vwc-data-grid-cell>
    <vwc-data-grid-cell>
      Expected Q4 2025
    </vwc-data-grid-cell>
  </vwc-data-grid-row>
  <vwc-data-grid-row>
    <vwc-data-grid-cell>
      <a href="https://jira.vonage.com/browse/VIV-2430">Color Picker</a>
    </vwc-data-grid-cell>
    <vwc-data-grid-cell></vwc-data-grid-cell>
    <vwc-data-grid-cell></vwc-data-grid-cell>
    <vwc-data-grid-cell>
      Expected Q3 2025
    </vwc-data-grid-cell>
  </vwc-data-grid-row>
  <vwc-data-grid-row>
    <vwc-data-grid-cell>
      <a href="https://jira.vonage.com/browse/VIV-2249">Design Token architecture</a>
    </vwc-data-grid-cell>
    <vwc-data-grid-cell></vwc-data-grid-cell>
    <vwc-data-grid-cell></vwc-data-grid-cell>
    <vwc-data-grid-cell>
      Expected Q3 2025
    </vwc-data-grid-cell>
  </vwc-data-grid-row>
  <vwc-data-grid-row>
    <vwc-data-grid-cell>
      <a href="/components/calendar/">Calendar enhancements</a>
    </vwc-data-grid-cell>
    <vwc-data-grid-cell>
      <vwc-button label="Done" appearance="ghost-light" connotation="success" href="https://docs.google.com/document/d/12IfWRU77mGrYrDo9eu2PyXWpBibLqYIoNOESkUkZ3Cw/edit?tab=t.0">
        <vwc-icon slot="icon" name="check"></vwc-icon>
      </vwc-button>
    </vwc-data-grid-cell>
    <vwc-data-grid-cell>
      <vwc-button label="Done" appearance="ghost-light" connotation="success">
        <vwc-icon slot="icon" name="check"></vwc-icon>
      </vwc-button>
    </vwc-data-grid-cell>
    <vwc-data-grid-cell>
      Expected Q2 2025
    </vwc-data-grid-cell>
  </vwc-data-grid-row>
  <vwc-data-grid-row>
    <vwc-data-grid-cell>
      <a href="/components/rich-text-editor/code/">Rich Text Editor</a>
    </vwc-data-grid-cell>
    <vwc-data-grid-cell>
      <vwc-button label="Done" appearance="ghost-light" connotation="success" href="https://docs.google.com/document/d/18Y2-LNwyOzTQ8a2FqYmPx3w-ofWjRstVyMx_9e7Z6vg/edit?tab=t.0#heading=h.8z0p4ep2y9ul">
        <vwc-icon slot="icon" name="check"></vwc-icon>
      </vwc-button>
    </vwc-data-grid-cell>
    <vwc-data-grid-cell>
      <vwc-button label="Done" appearance="ghost-light" connotation="success" href="https://www.figma.com/design/MecZdrBIj3v6JabIwvBkYX/Rich-text-editor?node-id=6-13392&p=f&t=UaZrrH1kCQbzKgID-0">
        <vwc-icon slot="icon" name="check"></vwc-icon>
      </vwc-button>
    </vwc-data-grid-cell>
    <vwc-data-grid-cell>
      Expected Q2 2025 (Phase 1)
    </vwc-data-grid-cell>
  </vwc-data-grid-row>
  <vwc-data-grid-row>
    <vwc-data-grid-cell>
      <a href="/components/date-time-picker/">Date Time Picker</a>
    </vwc-data-grid-cell>
    <vwc-data-grid-cell>
      <vwc-button label="Done" appearance="ghost-light" connotation="success" href="https://jira.vonage.com/browse/VIV-2073">
        <vwc-icon slot="icon" name="check"></vwc-icon>
      </vwc-button>
    </vwc-data-grid-cell>
    <vwc-data-grid-cell>
      <vwc-button label="Done" appearance="ghost-light" connotation="success" href="https://jira.vonage.com/browse/VIV-2073">
        <vwc-icon slot="icon" name="check"></vwc-icon>
      </vwc-button>
    </vwc-data-grid-cell>
    <vwc-data-grid-cell>
      <vwc-button label="Awaiting AT" appearance="ghost-light" href="/components/date-time-picker/" connotation="success">
        <vwc-icon slot="icon" name="more-horizontal-line"></vwc-icon>
      </vwc-button>
    </vwc-data-grid-cell>
  </vwc-data-grid-row>
  <vwc-data-grid-row>
    <vwc-data-grid-cell>
      <a href="/components/searchable-select">Searchable Select</a>
    </vwc-data-grid-cell>
    <vwc-data-grid-cell>
      <vwc-button label="Done" appearance="ghost-light" href="https://confluence.vonage.com/display/VIVID/Multi-select+combobox+research" connotation="success">
        <vwc-icon slot="icon" name="check"></vwc-icon>
      </vwc-button>
    </vwc-data-grid-cell>
    <vwc-data-grid-cell>
      <vwc-button label="Done" appearance="ghost-light" href="https://www.figma.com/design/Zau4yNbnfBCBT53FZDoLr2/%C2%A0Multiselect-Combobox?node-id=1-3&t=c5CHXRHGC946vCQu-0" connotation="success">\
        <vwc-icon slot="icon" name="check"></vwc-icon>
      </vwc-button>
    </vwc-data-grid-cell>
    <vwc-data-grid-cell>
      <vwc-button label="Done" appearance="ghost-light" href="/components/searchable-select" connotation="success">
        <vwc-icon slot="icon" name="more-horizontal-line"></vwc-icon>
      </vwc-button>
    </vwc-data-grid-cell>
  </vwc-data-grid-row>
  <vwc-data-grid-row>
    <vwc-data-grid-cell>
      <a href="/components/range-slider/">Range Slider</a>
    </vwc-data-grid-cell>
    <vwc-data-grid-cell>
      <vwc-button label="Done" target="_blank" appearance="ghost-light" href="https://confluence.vonage.com/display/VIVID/Range+slider" connotation="success">
        <vwc-icon slot="icon" name="check"></vwc-icon>
      </vwc-button>
    </vwc-data-grid-cell>
    <vwc-data-grid-cell>
    <vwc-button label="Done" target="_blank" appearance="ghost-light" href="https://www.figma.com/file/JJNgZvt1qf3ydYmOwbE3Jg/Vivid-UI-Kit---3.0-WIP?type=design&node-id=31345%3A96328&mode=design&t=QNhBeU12Gu7dtS7N-1" connotation="success">
      <vwc-icon slot="icon" name="check"></vwc-icon>
    </vwc-button>
    </vwc-data-grid-cell>
    <vwc-data-grid-cell>
      <vwc-button label="Done" appearance="ghost-light" href="/components/range-slider/" connotation="success">
        <vwc-icon slot="icon" name="more-horizontal-line"></vwc-icon>
      </vwc-button>
    </vwc-data-grid-cell>
  </vwc-data-grid-row>
  <vwc-data-grid-row>
    <vwc-data-grid-cell>
      <a href="/components/video-player/">Video Player</a>
    </vwc-data-grid-cell>
    <vwc-data-grid-cell>
      <vwc-button label="Done"  appearance="ghost-light" target="_blank" href="https://confluence.vonage.com/display/VIVID/Video+player" connotation="success">
        <vwc-icon slot="icon" name="check"></vwc-icon>
      </vwc-button>
    </vwc-data-grid-cell>
    <vwc-data-grid-cell>
      <vwc-button label="Done" appearance="ghost-light" target="_blank" href="https://www.figma.com/file/tWEyQlBY6cBymajaJPLSy0/Vivid-3.0-WIP-Drafts?type=design&node-id=23%3A13702&mode=design&t=PGI1aODhsHS1YDhV-1" connotation="success">
        <vwc-icon slot="icon" name="check"></vwc-icon>
      </vwc-button>
    </vwc-data-grid-cell>
    <vwc-data-grid-cell>
      <vwc-button label="Done" appearance="ghost-light" href="/components/video-player/" connotation="success">
        <vwc-icon slot="icon" name="more-horizontal-line"></vwc-icon>
      </vwc-button>
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
