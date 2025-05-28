const { algoliasearch, instantsearch } = window;

const searchClient = algoliasearch('2CG2TODXE6', 'cf813bb677b9fddc7eb5c0681be68a3d');

const search = instantsearch({
  indexName: 'Mediatheque',
  searchParams: { facets: ['author', 'genre', 'type'] },
  searchClient,
  future: { preserveSharedStateOnUnmount: true },
});

const { dynamicWidgets, menu, hierarchicalMenu } = instantsearch.widgets;

search.addWidgets([
    instantsearch.widgets.searchBox({
      container: '#searchbox',
    }),
    instantsearch.widgets.hits({
      container: '#hits',
      templates: {
        item: (hit, { html, components }) => html`
          <article>
            <img src=${hit.thumbnail} alt=${hit.title} />
            <div>
              <h1>${components.Highlight({ hit, attribute: 'title' })}</h1>
              <h2>${hit.author} - ${hit.year}</h2>
              <span>${hit.genre} ${hit.editor}</span>
              <p></p>
            </div>
          </article>
        `,
      },
    }),
    instantsearch.widgets.configure({
      hitsPerPage: 8,
    }),
    instantsearch.widgets.pagination({
      container: '#pagination',
    }),

    // 🟩 FACETTES
    instantsearch.widgets.refinementList({
      container: '#genre-list',
      attribute: 'genre',
      searchable: true,
      templates: {
        header: 'Genre',
      },
    }),
    instantsearch.widgets.refinementList({
      container: '#type-list',
      attribute: 'type',
      searchable: true,
      templates: {
        header: 'Type',
      },
    }),
  ]
  );


search.start();

