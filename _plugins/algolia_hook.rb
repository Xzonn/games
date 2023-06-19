module Jekyll
  module Algolia
    module Hooks
      def self.before_indexing_each(record, node, context)
        [:categories, :comment_date, :excerpt_text, :excerpt_html, :headings, :hours, :html, :no_ad, :no_comment, :no_sidenav, :permalink, :screenshot_count, :slug, :type, :theme_color].each do |field|
          record.delete(field)
        end

        tags = []
        [:platform, :store, :status, :franchise, :genre].each do |field|
          if record[field] then
            tags.push(record[field])
            record.delete(field)
          end
        end

        record[:tags] = tags
        if record[:screenshot_captions] then
          record[:screenshot_captions] = record[:screenshot_captions].values
        end

        return record
      end
    end
  end
end
