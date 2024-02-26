# Roadmap

## In Progress Components

<vwc-elevation dp="2">
<vwc-data-grid>
  <vwc-data-grid-row row-type="header">
    <vwc-data-grid-cell cell-type="columnheader">
      Component
    </vwc-data-grid-cell>
    <vwc-data-grid-cell cell-type="columnheader">
      Discovery
    </vwc-data-grid-cell>
    <vwc-data-grid-cell cell-type="columnheader">
      Design
    </vwc-data-grid-cell>
    <vwc-data-grid-cell cell-type="columnheader">
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
      <vwc-button label="In Progress" connotation="cta"></vwc-button>
    </vwc-data-grid-cell>
    <vwc-data-grid-cell>
      <vwc-button label="On hold" connotation="accent"></vwc-button>
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
      <vwc-button label="In Progress" connotation="cta"></vwc-button>
    </vwc-data-grid-cell>
  </vwc-data-grid-row>
</vwc-data-grid>
</vwc-elevation>


## Completed Components

{% assign sortedComponents = components | sort: 'title' %}

<vwc-elevation dp="2">
<vwc-data-grid>
  <vwc-data-grid-row row-type="header">
    <vwc-data-grid-cell cell-type="columnheader">
      Component
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
