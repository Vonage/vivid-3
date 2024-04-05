# Roadmap

## Upcoming Components

<style>
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

<vwc-elevation dp="2">
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
      Dial Pad
    </vwc-data-grid-cell>
    <vwc-data-grid-cell>
      <vwc-button label="Done" target="_blank" href="https://confluence.vonage.com/pages/viewpage.action?spaceKey=VIVID&title=Dial+pad" icon="check" connotation="success"></vwc-button>
    </vwc-data-grid-cell>
    <vwc-data-grid-cell>
    <vwc-button label="Done" target="_blank" href="https://www.figma.com/file/tWEyQlBY6cBymajaJPLSy0/Vivid-3.0-WIP-Drafts?type=design&node-id=67-39674&mode=design&t=X4VuTNKdOR3AX037-0" icon="more-horizontal-line" connotation="success"></vwc-button>
    </vwc-data-grid-cell>
    <vwc-data-grid-cell>
      <vwc-button label="Awaiting AT" icon="more-horizontal-line" href="/components/dial-pad" connotation="success"></vwc-button>
    </vwc-data-grid-cell>
  </vwc-data-grid-row>
  <vwc-data-grid-row>
    <vwc-data-grid-cell>
      <a href="/components/range-slider">Range Slider</a>
    </vwc-data-grid-cell>
    <vwc-data-grid-cell>
      <vwc-button label="Done" target="_blank" href="https://confluence.vonage.com/display/VIVID/Range+slider" icon="check" connotation="success"></vwc-button>
    </vwc-data-grid-cell>
    <vwc-data-grid-cell>
    <vwc-button label="Done" target="_blank" href="https://www.figma.com/file/JJNgZvt1qf3ydYmOwbE3Jg/Vivid-UI-Kit---3.0-WIP?type=design&node-id=31345%3A96328&mode=design&t=QNhBeU12Gu7dtS7N-1" icon="check" connotation="success"></vwc-button>
    </vwc-data-grid-cell>
    <vwc-data-grid-cell>
      <vwc-button label="Awaiting AT" icon="more-horizontal-line" href="/components/range-slider" connotation="success"></vwc-button>
    </vwc-data-grid-cell>
  </vwc-data-grid-row>
  <vwc-data-grid-row>
    <vwc-data-grid-cell>
      <a href="/components/time-picker">Time Picker</a>
    </vwc-data-grid-cell>
    <vwc-data-grid-cell>
      <vwc-button label="Done" icon="check" connotation="success"></vwc-button>
    </vwc-data-grid-cell>
    <vwc-data-grid-cell>
    <vwc-button label="Done" target="_blank" href="https://www.figma.com/file/JJNgZvt1qf3ydYmOwbE3Jg/Vivid-UI-Kit---3.0-WIP?type=design&node-id=31345%3A96328&mode=design&t=QNhBeU12Gu7dtS7N-1" icon="check" connotation="success"></vwc-button>
    </vwc-data-grid-cell>
    <vwc-data-grid-cell>
      <vwc-button  label="Awaiting AT" icon="more-horizontal-line" href="/components/time-picker" connotation="success"></vwc-button>
    </vwc-data-grid-cell>
  </vwc-data-grid-row>
  <vwc-data-grid-row>
    <vwc-data-grid-cell>
      Video Player
    </vwc-data-grid-cell>
    <vwc-data-grid-cell>
      <vwc-button label="Done" icon="check" target="_blank" icon="check" href="https://confluence.vonage.com/display/VIVID/Video+player" connotation="success"></vwc-button>
    </vwc-data-grid-cell>
    <vwc-data-grid-cell>
      <vwc-button label="Done" icon="check" target="_blank" href="https://www.figma.com/file/tWEyQlBY6cBymajaJPLSy0/Vivid-3.0-WIP-Drafts?type=design&node-id=23%3A13702&mode=design&t=PGI1aODhsHS1YDhV-1" connotation="success"></vwc-button>
    </vwc-data-grid-cell>
    <vwc-data-grid-cell>
      <vwc-button label="Exp: 03/2024" icon="more-horizontal-line" target="_blank" href="https://jira.vonage.com/browse/VIV-1486" connotation="cta"></vwc-button>
    </vwc-data-grid-cell>
  </vwc-data-grid-row>
</vwc-data-grid>
</vwc-elevation>

### Key

| Term      | Description                                                                                                          |
| --------- | -------------------------------------------------------------------------------------------------------------------- |
| Discovery | Validate the shared value of the feature and that we understand the problem well enough to commit further resources. |
| Design    | Ensure designs meet user needs while upholding our brand standards and visual language.                              |
| Alpha     | Component is available and documentation is published.                                                               |
| AT        | Acceptance testing: before we fully release a new component it must be integrated and validated by at least 2 teams  |
