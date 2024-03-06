# Roadmap

## In Progress

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
      Development
    </vwc-data-grid-cell>
  </vwc-data-grid-row>
  <vwc-data-grid-row>
    <vwc-data-grid-cell>
      Video Player
    </vwc-data-grid-cell>
    <vwc-data-grid-cell>
      <vwc-button label="In Progress" target="_blank" href="https://confluence.vonage.com/display/VIVID/Video+component+spike" connotation="cta"></vwc-button>
    </vwc-data-grid-cell>
    <vwc-data-grid-cell>
      <vwc-button label="In Progress" target="_blank" href="https://www.figma.com/file/tWEyQlBY6cBymajaJPLSy0/Vivid-3.0-WIP-Drafts?type=design&node-id=23%3A13702&mode=design&t=PGI1aODhsHS1YDhV-1" connotation="cta"></vwc-button>
    </vwc-data-grid-cell>
    <vwc-data-grid-cell>
      <vwc-button label="In progress" target="_blank" href="https://jira.vonage.com/browse/VIV-1486" connotation="cta"></vwc-button>
    </vwc-data-grid-cell>
  </vwc-data-grid-row>
  <vwc-data-grid-row>
    <vwc-data-grid-cell>
      Range Slider
    </vwc-data-grid-cell>
    <vwc-data-grid-cell>
      <vwc-button label="Done" target="_blank" href="https://confluence.vonage.com/display/VIVID/Range+slider" connotation="success"></vwc-button>
    </vwc-data-grid-cell>
    <vwc-data-grid-cell>
    <vwc-button label="Done" target="_blank" href="https://www.figma.com/file/JJNgZvt1qf3ydYmOwbE3Jg/Vivid-UI-Kit---3.0-WIP?type=design&node-id=31345%3A96328&mode=design&t=QNhBeU12Gu7dtS7N-1" connotation="success"></vwc-button>
    </vwc-data-grid-cell>
    <vwc-data-grid-cell>
      <vwc-button label="In Progress" target="_blank" href="https://jira.vonage.com/browse/VIV-1488" connotation="cta"></vwc-button>
    </vwc-data-grid-cell>
  </vwc-data-grid-row>
  <vwc-data-grid-row>
    <vwc-data-grid-cell>
      Dial Pad
    </vwc-data-grid-cell>
    <vwc-data-grid-cell>
      <vwc-button label="Done" target="_blank" href="https://confluence.vonage.com/pages/viewpage.action?spaceKey=VIVID&title=Dial+pad" connotation="success"></vwc-button>
    </vwc-data-grid-cell>
    <vwc-data-grid-cell>
    <vwc-button label="In Progress" target="_blank" href="https://www.figma.com/file/tWEyQlBY6cBymajaJPLSy0/Vivid-3.0-WIP-Drafts?type=design&node-id=67-39674&mode=design&t=X4VuTNKdOR3AX037-0" connotation="cta"></vwc-button>
    </vwc-data-grid-cell>
    <vwc-data-grid-cell>
      <vwc-button label="In Progress" target="_blank" href="https://jira.vonage.com/browse/VIV-1512" connotation="cta"></vwc-button>
    </vwc-data-grid-cell>
  </vwc-data-grid-row>
</vwc-data-grid>
</vwc-elevation>

## Completed

{% assign sortedComponents = components | sort: 'title' %}

<vwc-elevation dp="2">
<vwc-data-grid>
  <vwc-data-grid-row row-type="header">
    <vwc-data-grid-cell cell-type="columnheader">
      Name
    </vwc-data-grid-cell>
    <vwc-data-grid-cell cell-type="columnheader">
      Status
    </vwc-data-grid-cell>
  </vwc-data-grid-row>
{% for item in sortedComponents)
	%}<vwc-data-grid-row>
		<vwc-data-grid-cell>
			{{ item.title }}
		</vwc-data-grid-cell>
		<vwc-data-grid-cell>
				<vwc-badge appearance='subtle' 
						text='{% if item.status == 'alpha' %}Alpha{% else %}GA{% endif %}'
						connotation='{% if item.status == 'alpha' %}warning{% else %}success{% endif %}'
				></vwc-badge>
		</vwc-data-grid-cell>
	</vwc-data-grid-row>{%
endfor %}
</vwc-data-grid>
</vwc-elevation>
