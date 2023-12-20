import EditorJS from '@editorjs/editorjs';
import {I18nDictionary} from '@editorjs/editorjs'
/**
 * Block Tools for the Editor
 */
import Header from '@editorjs/header';
import Image from '@editorjs/image';
import CodeTool from '@editorjs/code';
import List from '@editorjs/list';
import Delimiter from '@editorjs/delimiter';
import Table from '@editorjs/table';
import Warning from '@editorjs/warning';
import Checklist from '@editorjs/checklist';
import LinkTool from '@editorjs/link';
import RawTool from '@editorjs/raw';
import Embed from '@editorjs/embed';

/**
 * Inline Tools for the Editor
 */
import InlineCode from '@editorjs/inline-code';
import Marker from '@editorjs/marker';

/**
 * Class for working with Editor.js
 */
export default class Editor {
  /**
   * Creates Editor instance
   *
   * @param {object} editorConfig - configuration object for Editor.js
   * @param {object} data.blocks - data to start with
   * @param {object} options
   * @param {string} options.headerPlaceholder - placeholder for Header tool
   */
  constructor(editorConfig = {}, options = {}) {
    const defaultConfig = {
      tools: {
        header: {
          class: Header,
          inlineToolbar: ['marker', 'inlineCode'],
          config: {
            placeholder: options.headerPlaceholder || '',
          },
        },

        image: {
          class: Image,
          inlineToolbar: true,
          config: {
            types: 'image/*, video/mp4',
            endpoints: {
              byFile: '/api/transport/image',
              byUrl: '/api/transport/fetch',
            },
          },
        },

        linkTool: {
          class: LinkTool,
          config: {
            endpoint: '/api/fetchUrl',
          },
        },

        code: {
          class: CodeTool,
          shortcut: 'CMD+SHIFT+D',
        },

        list: {
          class: List,
          inlineToolbar: true,
        },

        delimiter: Delimiter,

        table: {
          class: Table,
          inlineToolbar: true,
        },

        warning: {
          class: Warning,
          inlineToolbar: true,
        },

        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },

        /**
         * Inline Tools
         */
        inlineCode: {
          class: InlineCode,
          shortcut: 'CMD+SHIFT+C',
        },

        marker: {
          class: Marker,
          shortcut: 'CMD+SHIFT+M',
        },

        raw: RawTool,

        embed: Embed,
      },
      data: {
        blocks: [
          {
            type: 'header',
            data: {
              text: '',
              level: 2,
            },
          },
        ],
      },
      /**
       * Internationalzation config
       */
      i18n: {
        /**
         * @type {I18nDictionary}
         */
        messages: {
          /**
           * Other below: translation of different UI components of the editor.js core
           */
          "ui": {
            "blockTunes": {
              "toggler": {
                "Click to tune": "Нажмите, чтобы настроить",
                "or drag to move": "или перетащите"
              },
            },
            "inlineToolbar": {
              "converter": {
                "Convert to": "Конвертировать в"
              }
            },
            "toolbar": {
              "toolbox": {
                "Add": "Добавить",
              }
            },
            "popover": {
              "Filter": "Поиск",
              "Nothing found": "Ничего не найдено"
            }
          },

          /**
           * Section for translation Tool Names: both block and inline tools
           */
          "toolNames": {
            "Text": "Параграф",
            "Heading": "Заголовок",
            "List": "Список",
            "Warning": "Примечание",
            "Checklist": "Чеклист",
            "Quote": "Цитата",
            "Code": "Код",
            "Delimiter": "Разделитель",
            "Raw HTML": "HTML-фрагмент",
            "Table": "Таблица",
            "Link": "Ссылка",
            "Marker": "Маркер",
            "Bold": "Полужирный",
            "Italic": "Курсив",
            "InlineCode": "Моноширинный",
            "Image": "Картинка"
          },

          /**
           * Section for passing translations to the external tools classes
           */
          "tools": {
            /**
             * Each subsection is the i18n dictionary that will be passed to the corresponded plugin
             * The name of a plugin should be equal the name you specify in the 'tool' section for that plugin
             */
            "warning": { // <-- 'Warning' tool will accept this dictionary section
              "Title": "Название",
              "Message": "Сообщение",
            },

            /**
             * Link is the internal Inline Tool
             */
            "link": {
              "Add a link": "Вставьте ссылку"
            },
            /**
             * The "stub" is an internal block tool, used to fit blocks that does not have the corresponded plugin
             */
            "stub": {
              'The block can not be displayed correctly.': 'Блок не может быть отображен'
            },
            "image": {
              "Caption": "Подпись",
              "Select an Image": "Выберите файл",
              "With border": "Добавить рамку",
              "Stretch image": "Растянуть",
              "With background": "Добавить подложку",
            },
            "code": {
              "Enter a code": "Код",
            },
            "linkTool": {
              "Link": "Ссылка",
              "Couldn't fetch the link data": "Не удалось получить данные",
              "Couldn't get this link data, try the other one": "Не удалось получить данные по ссылке, попробуйте другую",
              "Wrong response format from the server": "Неполадки на сервере",
            },
            "header": {
              "Header": "Заголовок",
            },
            "paragraph": {
              "Enter something": "Введите текст"
            },
            "list": {
              "Ordered": "Нумерованный",
              "Unordered": "Маркированный",
            },
            "table": {
              "With headings": "С заголовком",
              "Without headings": "Без заголовка",
              "Add column to left": "Добавить колонку слева",
              "Add column to right": "Добавить колонку справа",
              "Delete column": "Удалить колонку",
              "Add row above": "Добавить строку выше",
              "Add row below": "Добавить строку ниже",
              "Delete row": "Удалить строку",
            }
          },

          /**
           * Section allows to translate Block Tunes
           */
          "blockTunes": {
            /**
             * Each subsection is the i18n dictionary that will be passed to the corresponded Block Tune plugin
             * The name of a plugin should be equal the name you specify in the 'tunes' section for that plugin
             *
             * Also, there are few internal block tunes: "delete", "moveUp" and "moveDown"
             */
            "delete": {
              "Delete": "Удалить",
              "Click to delete": "Нажмите чтобы удалить"
            },
            "moveUp": {
              "Move up": "Переместить вверх"
            },
            "moveDown": {
              "Move down": "Переместить вниз"
            }
          },
        }
      }
    };

    this.editor = new EditorJS(Object.assign(defaultConfig, editorConfig));
  }

  /**
   * Return Editor data
   *
   * @returns {Promise.<{}>}
   */
  save() {
    return this.editor.saver.save();
  }
}
